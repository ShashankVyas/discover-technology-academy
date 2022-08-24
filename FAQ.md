# DFS TruCreds Hackathon - FAQ

## What is Ngrok?

[Ngrok](https://ngrok.com/) is an application that exposes local server ports to the Internet.

## Why is Ngrok needed?

The Avast Verity server uses webhooks to send messages to your issuer or verifier.  However, if they are running on your local workstation, a reverse proxy such as Ngrok is needed.  Ngrok provides a public url for Verity webhooks.

## What is the Ngrok restriction preventing thee issuer and verifier from running at the same time?

The restriction is with the free version of ngrok. Only one instance is allowed to run on your workstation. 

Ngrok is started by ```ngrok http 3000``` which routes all incoming calls to port 3000. For Verity webhooks, the incoming POST message is sent to whichever app is running on that port.

Since only one running app can listen on the same port, all issuer and verifier apps must be run separately.  A way to get around the limitation is to combine the apps into one.

