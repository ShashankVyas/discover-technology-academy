// @flow

/*
  Here you need to specify application provisioning information.
*/

// an ID given to you from Evernym's Support Team after the Sponsor onboarding process is complete.
export const SPONSOR_ID = 'TruCreds_Team5'

// the list of used environments.
export const SERVER_ENVIRONMENTS = {
  'CUSTOM': {
    agencyUrl: 'https://agency.pps.evernym.com',
    agencyDID: '3mbwr7i85JNSL3LoNQecaW',
    agencyVerificationKey: '2WXxo6y1FJvXWgZnoYUP5BJej2mceFrqBDNPE3p6HDPf',
    poolConfig: [{ key: 'staging', genesis: 'genesis_transactions' }],
  }
}

// environment to use by default
export const DEFAULT_SERVER_ENVIRONMENT = 'CUSTOM'


/*
 * Function to be called to get provision token
 * Signature: GET_PROVISION_TOKEN_FUNC() -> [error: string | null, token: string | null]
 * */
//export const GET_PROVISION_TOKEN_FUNC = null

export const GET_PROVISION_TOKEN_FUNC = async () => {
  try {
    const response = await fetch('http://75ba-2601-248-2-89d0-95fc-713e-1634-13fa.ngrok.io/generate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "sponseeId": "545516d9-9c5d-4bae-84c6-a74989499cc6" }),
    });
    const json = await response.json();
    console.log(JSON.stringify(json));
    return [null, JSON.stringify(json)]
  }
  catch (error) {
    return [error.message, null]
  }
}

export const VCX_PUSH_TYPE = 3

