# Hack the Code

Follow these instructions to develop a customized mobile application using the **[React Native White Label Mobile App](https://gitlab.com/evernym/mobile/react-native-white-label-app)** by [Avast](https://avast.com) for the ```Hack the Code``` track of the hackathon.  This white labelled app is essentially the **Avast Connect.me** mobile application that you can customize to include our Discover branding.

> Note:  You can use either the **Avast Connect.me** mobile application or the mobile application built from this directory for the ```Hack the Code``` track.

The mobile app source code is available from Avast at https://gitlab.com/evernym/mobile/react-native-white-label-app.  It is written using React Native, and can be built for iOS and Android.

The Avast repo [Readme](https://gitlab.com/evernym/mobile/react-native-white-label-app/-/blob/main/README.md) outlines the instructions to edit and build the mobile app for iOS and Android.  To save time and simplify development, we've performed these instructions for you and have put the resulting code under the `src` directory.  You can start with either the [Avast repo](https://gitlab.com/evernym/mobile/react-native-white-label-app) or code in `src`.

## Tutorial

The following is a turorial which leads you through building and running the mobile app using the source code in the `src` directory.

## Register your Mobile Sponsor with Avast (Evernym) Cloud Service 

For the mobile application to work as expected, your team has to have a Mobile Sponsor registered with [Evernym's Cloud Service](https://gitlab.com/evernym/mobile/mobile-sdk/-/blob/main/docs/3.Initialization.md#sponsor-ie-you-onboarding-with-evernyms-cloud-service). 

Avast has pre-registered some Mobile Sponsor IDs for the DFS Hackathon participants, so you don't need to generate your own verification key as described in the documentation. To get registered, simply send an email of the following form to natalia.moskaleva@avast.com:

   ```
   Subject: Mobile Sponsor Registration Request for DFS hackathon 

   Team: <your team name>
   ```

You will receive an email confirmation containing your Sponsor ID, as well as the `verkey` and `seed` for your Mobile Sponsor. 

You will then need to:
- Update the `SPONSOR_ID` in the `app/evernym-sdk/provision.js` file with your Sponsor ID. Make sure the `DEFAULT_SERVER_ENVIRONMENT` is set to `"DEMO"`, and you have a working `GET_PROVISION_TOKEN_FUNC` function. An example is provided [here](./src/app/evernym-sdk/provision.js#L22).
- Run your Sponsor Server. The Sponsor Server will generate and sign a token necessary to provision a Cloud Agent for your app. Please refer to [Evernym's documentation](https://gitlab.com/evernym/mobile/mobile-sdk/-/tree/main/examples/simple-sponsor) for details. It is recommended to run the Sponsor Server [with Docker](https://gitlab.com/evernym/mobile/mobile-sdk/-/tree/main/examples/simple-sponsor#in-docker). The `verkey` and `seed` you received from Natalia have to be added to the `server.conf` file in your Sponsor Server. 

You will only need your Sponsor Server running when the app is first initialized (the token is generated and signed when you finish setting up the app and accept Terms and Conditions). As soon as the app is set up and the token is generated, you can stop the Sponsor Server. 

## Android

To build the React Native White Label Mobile App, you will need the following prerequisites:
- Android SDK with API 31
- yarn (tested with 1.22.19)
- Node.js 12.22+ (tested with 16.15.1)
- Android device

**Make sure you have received your Sponsor ID, updated the files as described [above](#register-your-mobile-sponsor-with-avast-evernym-cloud-service), and have your Sponsor Server running before you proceed to the next steps.**

Steps:
1. Install prereqs
	```
	$ cd src
	$ yarn
	```
2. Attach Android device
3. Start Metro server for React Native
    ```
    $ npm start
    ```
4. Build and run application
	```
	$ npm run android
	```

## iOS

To build the React Native White Label Mobile App, you will need the following prerequisites:
- Mac system (tested with OSX 12.3.1)
- Xcode 13+ (tested with 13.4.1)
- yarn (tested with 1.22.19)
- CocoaPod 1.10.1+ (tested with 1.11.3)
- Node.js 12.22+ (tested with 16.15.1)
- iOS device (tested with iPhone 11 iOS 15.5)

**Make sure you have received your Sponsor ID, updated the files as described [above](#register-your-mobile-sponsor-with-avast-evernym-cloud-service), and have your Sponsor Server running before you proceed to the next steps.**

Steps:

1. Build 
	```
	$ cd src
	$ yarn
	$ cd ios
	$ pod install
	```
2. Open ```MsdkProject.xcworkspace``` in Xcode.
3. Attach iOS device
4. Build and run project

## Additional Considerations

- Push Notifications are not implemented in the app and would require additional configurations. The app uses polling for messages by default. For more details on push notifications, see [this document](https://gitlab.com/evernym/mobile/mobile-sdk/-/blob/main/docs/PushNotifications.md).