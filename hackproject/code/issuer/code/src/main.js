'use strict'

const axios = require('axios')
const express = require('express')
const QR = require('qrcode')
const uuid4 = require('uuid4')
const urljoin = require('url-join')
require('dotenv').config()

const ANSII_GREEN = '\u001b[32m'
const ANSII_RESET = '\x1b[0m'
const PORT = 3000

//-------------------------------------------------------------------
// STEP 1 - Set configuration values for Verity application server
//-------------------------------------------------------------------
const verityUrl = process.env["VERITY_URL"] || "https://vas.pps.evernym.com"
const domainDid = process.env["DOMAIN_DID"]
const xApiKey = process.env["X_API_KEY"]
const credDefId = process.env["CREDENTIAL_DEFINITION_ID"]

// Verify that .env variables are set
let error = false;
if (!verityUrl) {
	console.log("The 'VERITY_URL' environment variable must be set.")
	error = true;
}
if (!domainDid) {
	console.log("The 'DOMAIN_DID' environment variable must be set.")
	error = true;
}
if (!xApiKey) {
	console.log("The 'X_API_KEY' environment variable must be set.")
	error = true;
}
if (!credDefId) {
	console.log("The 'CREDENTIAL_DEFINITION_ID' environment variable is not set.")
	error = true;
}
if (error) {
	process.exit(1);
}

//-------------------------------------------------------------------
// STEP 2 - Specify data for credential to issue
// NOTE: Make sure you use ALL fields from the schema you used for a credential definition
//-------------------------------------------------------------------

// Credential data
const credentialData = {
};

// Maps containing promises for the started interactions - threadId is used as the map key
const updateConfigsMap = new Map() 		// Update configs
const relCreateMap = new Map()			// Relationship create
const relInvitationMap = new Map()		// Relationship invitation
const issueCredentialMap = new Map()	// Issue Credential

// Map for connection accepted promise - relationship DID is used as the map key
const connectionAccepted = new Map()

// Update webhook protocol is synchronous and does not support threadId
let webhookResolve

// Relationship for incoming connections
let relationshipDid;

// Public URL for the webhook endpoint
let webhookUrl = null;

/**
 * Sends a message to the Verity Application Service via the Verity REST API
 * 
 * @param qualifier - either 'BzCbsNYhMrjHiqZDTUASHg' for Aries community protocols or '123456789abcdefghi1234' for Evernym-specific protocols
 * @param msgFamily - message family (e.g. 'present-proof')
 * @param msgFamilyVersion - version of the message family (e.g. '1.0')
 * @param msgName - name of the protocol message to perform (e.g. 'request')
 * @param message - message to be sent in the body payload
 * @param threadId - unique identifier of the protocol interaction. The threadId is used to distinguish between simultaenous interactions
 */
async function sendVerityRESTMessage(qualifier, msgFamily, msgFamilyVersion, msgName, message, threadId) {

	// Add @type and @id fields to the message in the body payload
	// Field @type is dinamycially constructed from the function arguments and added into the message payload
	message['@type'] = `did:sov:${qualifier};spec/${msgFamily}/${msgFamilyVersion}/${msgName}`
	message['@id'] = uuid4()

	if (!threadId) {
		threadId = uuid4()
	}

	// send prepared message to Verity and return Axios request promise
	const url = urljoin(verityUrl, 'api', domainDid, msgFamily, msgFamilyVersion, threadId)
	console.log(`Posting message to ${ANSII_GREEN}${url}${ANSII_RESET}`)
	console.log(`${ANSII_GREEN}${JSON.stringify(message, null, 4)}${ANSII_RESET}`)
	return axios({
		method: 'POST',
		url: url,
		data: message,
		headers: {
			'X-API-key': xApiKey // <-- REST API Key is added in the header
		}
	})
}

/**
 * Initialize and run issuer
 */
async function run() {

	//-------------------------------------------------------------------
	// STEP 3 - Get webhook endpoint from ngrok
	//-------------------------------------------------------------------
	if (!webhookUrl) {
		const ngrok = await axios.get("http://localhost:4040/api/tunnels");
		webhookUrl = ngrok.data.tunnels[0].public_url + '/webhook';
		console.log("Setting webhookUrl =", webhookUrl)
	}

	//-------------------------------------------------------------------
	// STEP 4 - Update webhook endpoint
	//-------------------------------------------------------------------
	const webhookMessage = {
		comMethod: {
			id: 'webhook',
			type: 2,
			value: webhookUrl,
			packaging: {
				pkgType: 'plain'
			}
		}
	}
	const updateWebhook =
		new Promise(function (resolve, reject) {
			webhookResolve = resolve
			sendVerityRESTMessage('123456789abcdefghi1234', 'configs', '0.6', 'UPDATE_COM_METHOD', webhookMessage)
		})
	await updateWebhook

	//-------------------------------------------------------------------
	// STEP 5 - Update Verity server configuration
	//-------------------------------------------------------------------
	const updateConfigMessage = {
		configs: [
			{
				name: 'logoUrl',
				value: 'https://freeiconshop.com/wp-content/uploads/edd/bank-flat.png'
			},
			{
				name: 'name',
				value: 'Issuer'
			}
		]
	}
	const updateConfigsThreadId = uuid4()
	const updateConfigs =
		new Promise(function (resolve, reject) {
			updateConfigsMap.set(updateConfigsThreadId, resolve)
		})
	await sendVerityRESTMessage('123456789abcdefghi1234', 'update-configs', '0.6', 'update', updateConfigMessage, updateConfigsThreadId)
	await updateConfigs

	//-------------------------------------------------------------------
	// STEP 6 - Relationship creation 
	//-------------------------------------------------------------------
	// Create relationship key
	const relationshipCreateMessage = {}
	const relThreadId = uuid4()
	const relationshipCreate =
		new Promise(function (resolve, reject) {
			relCreateMap.set(relThreadId, resolve)
		})
	await sendVerityRESTMessage('123456789abcdefghi1234', 'relationship', '1.0', 'create', relationshipCreateMessage, relThreadId)
	relationshipDid = await relationshipCreate

	// Create invitation for the relationship
	const relationshipInvitationMessage = {
		'~for_relationship': relationshipDid,
		goalCode: 'issue-vc',
		goal: 'To issue a credential'
	}
	const relationshipInvitation =
		new Promise(function (resolve, reject) {
			relInvitationMap.set(relThreadId, resolve)
		})
	await sendVerityRESTMessage('123456789abcdefghi1234', 'relationship', '1.0', 'out-of-band-invitation', relationshipInvitationMessage, relThreadId)
	const inviteUrl = await relationshipInvitation
	console.log(`Invite URL is:\n${ANSII_GREEN}${inviteUrl}${ANSII_RESET}`)
	await QR.toFile('public/qrcode.png', inviteUrl)

	//-------------------------------------------------------------------
	// STEP 7 - Wait for and process all connection and credential requests
	//-------------------------------------------------------------------
	while (true) {

		//-------------------------------------------------------------------
		// STEP 7.1 - Wait for the user to scan the QR code and accept the connection
		//-------------------------------------------------------------------
		const connection =
			new Promise(function (resolve, reject) {
				connectionAccepted.set(relationshipDid, resolve)
			})
		console.log("relationshipDid =", relationshipDid)
		await connection

		//-------------------------------------------------------------------
		// STEP 7.2 - Credential issuance
		//-------------------------------------------------------------------
		const credentialMessage = {
			'~for_relationship': relationshipDid,
			cred_def_id: credDefId,
			credential_values: credentialData,
			price: 0,
			comment: 'MyCredential',
			auto_issue: true
		}
		const issueCredThreadId = uuid4()
		const credentialOffer =
			new Promise(function (resolve, reject) {
				issueCredentialMap.set(issueCredThreadId, resolve)
			})
		await sendVerityRESTMessage('BzCbsNYhMrjHiqZDTUASHg', 'issue-credential', '1.0', 'offer', credentialMessage, issueCredThreadId)
		await credentialOffer
	}
}

// Initialize express app
const app = express()
app.use(express.json())
require('express-ws')(app);

let websocket;
let logsBeforeReady = [];

/**
 * Send message to browser over websocket
 *
 * @param data
 */
async function wsSend(data) {
	if (websocket) {
		console.log("wsSend=>", data);
		await websocket.send(JSON.stringify(data));
	}
	else {
		logsBeforeReady.push(data);
	}
}


// Handle websocket messages from browser
app.ws('/', function (ws, req) {
	websocket = ws;
	ws.on('message', function (msg) {
		console.log("ws message =", msg);
		while (logsBeforeReady.length > 0) {
			wsSend(logsBeforeReady.shift());
		}
		if (msg == "info") {
			wsSend({ type: "info", data: { verityUrl, domainDid, webhookUrl, credDefId, credentialData } });
		}
	});
});

// Verity Application Server will send REST API callbacks to this endpoint
app.post('/webhook', async (req, res) => {
	const message = req.body
	const threadId = message['~thread'] ? message['~thread'].thid : null
	console.log('Got message on the webhook')
	console.log(`${ANSII_GREEN}${JSON.stringify(message, null, 4)}${ANSII_RESET}`)
	res.status(202).send('Accepted')

	// Handle received message differently based on the message type
	switch (message['@type']) {
		case 'did:sov:123456789abcdefghi1234;spec/configs/0.6/COM_METHOD_UPDATED':
			await wsSend({ type: "log", data: "Webhook updated" })
			webhookResolve('webhook updated')
			break

		case 'did:sov:123456789abcdefghi1234;spec/update-configs/0.6/status-report':
			await wsSend({ type: "log", data: "Configuration updated" })
			updateConfigsMap.get(threadId)('config updated')
			break

		case 'did:sov:123456789abcdefghi1234;spec/relationship/1.0/created':
			await wsSend({ type: "log", data: "Connection created" })
			relCreateMap.get(threadId)(message.did)
			break

		case 'did:sov:123456789abcdefghi1234;spec/relationship/1.0/invitation':
			await wsSend({ type: "log", data: "Connection invitation created" })
			relInvitationMap.get(threadId)(message.inviteURL)
			break

		case 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/request-received':
			await wsSend({ type: "log", data: "Connection request received" })
			break

		case 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/response-sent':
			await wsSend({ type: "log", data: "Connection accepted for " + message.myDID })
			connectionAccepted.get(message.myDID)('connection accepted')
			break

		case 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/trust_ping/1.0/sent-response':
			break

		case 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/out-of-band/1.0/relationship-reused':
			console.log("Connection already exists for relationship: ", message.relationship);
			await wsSend({ type: "log", data: "Connection already exists for " + message.relationship })
			const did = relationshipDid;
			relationshipDid = message.relationship;
			await connectionAccepted.get(did)('reuse')
			break;

		case 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/sent':
			if (message.msg['credentials~attach']) {
				await wsSend({ type: "log", data: "Credential issued" })
				await issueCredentialMap.get(threadId)('credential issued')
			}
			else {
				await wsSend({ type: "log", data: "Credential sent" })
			}
			break

		default:
			if (message.description.code == "rejection") {
				await wsSend({ type: "log", data: "Credential rejected" })
				await issueCredentialMap.get(threadId)('credential rejected')
			}
			else {
				console.log(`Unexpected message type ${message['@type']}`)
			}
	}
})

// Serve HTML
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
	run()
})
