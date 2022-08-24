// @flow

/*
  Here you need to specify application provisioning information.
*/

// an ID given to you from Evernym's Support Team after the Sponsor onboarding process is complete.
export const SPONSOR_ID = ''

// the list of used environments.
export const SERVER_ENVIRONMENTS = {}

// environment to use by default
export const DEFAULT_SERVER_ENVIRONMENT = "DEMO"

/*
 * Function to be called to get provision token
 * Signature: GET_PROVISION_TOKEN_FUNC() -> [error: string | null, token: string | null]
 * */
export const GET_PROVISION_TOKEN_FUNC = null

/* An example of a GET_PROVISION_TOKEN_FUNC function. Make sure to put your actual Sponsor's Endpoint. 
export const GET_PROVISION_TOKEN_FUNC = async () => {
  try {
     const response = await fetch('https://2b61-64-62-226-18.eu.ngrok.io/generate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"sponseeId": "545516d9-9c5d-4bae-84c6-a74989499cc5"}),
     });
const json = await response.json();
console.log(JSON.stringify(json));
return [null, JSON.stringify(json)]
}
     catch (error) {
     return [error.message, null]
  }
}

*/

export const VCX_PUSH_TYPE = 3

