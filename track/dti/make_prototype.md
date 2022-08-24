# Prototype Documentation

### Prepare Environment
1. Install the Connect.Me Digital Wallet mobile application on your iphone or android device.  It is available for free from the Apple AppStore for your iphone device, or from Google Play for your android device.

2. Create one or more Verity Flow accounts by sending an email of the following form to [Natalia Moskaleva](mailto:natalia.moskaleva@avast.com):

   ```
   Subject: DFS TruCreds Hackathon - Request for Verity Flow account(s)

   Team: <your team name>
   Discover email addresses: <one or more space-separated Discover team member addresses>
   ```

   * A separate Verity Flow account will be created for each email address listed.
   * An email will be sent to each address with login information.
   * Wait until you receive this login information.

3. Login to Verity Flow [here](https://verity-flow.pps.evernym.com) from your DFS or personal laptop.

   * When you initially login, you will be asked to set up multi-factor authentication; choose the "Remind Me Later" option.

### Use Case Process Steps 

#### 1: Create Issuer - XYZ

   * Select "Flows" on the left-hand panel and click "Create New Flow".  You should see a screen similar to the following.

   ![create-issuance-flow](./images/create-issuance-flow.png)

   * For #1, select "Issue" for the "Flow Template", and for the "Credential Name", enter a name which reflects the type of credential being issue (e.g. "My DFS Employee Credential").

   * For #2, enter one or more attribute names and types for each attribute.

   * For #3, you may customize any of the prompts that you will see each time the flow is executed; however, you need not change any of the default values.

   * For #4, you may customize the logo or colors if you want, or just leave the default values.

   * Click "Save Flow".

### 2: XYZ issues Employee Credential
   
   * Run an issuer flow to issue a credential as follows:

   * Click "Flows" on the left-hand panel and you'll see one line for each flow that you have created so far.  For example, the following is an issuer flow.

   ![list-issuance-flow](./images/list-issuance-flow.png)

   * Click "Run Flow" for the flow you want to run.  You will see a screen similar to the following.

   ![enter-cred-values](./images/enter-cred-values.png)

   * Enter values for each attribute and click the "Generate QR Code" button.  You will then see a QR code as follows.

   ![scan-cred](./images/scan-cred.png)

   * Open the Connect.Me mobile app and click the "Scan" button on the lower-right corner of the home screen.  Scan the QR code displayed by the Verity Flow application.  Accept the credential on your mobile device.

   * Click on the hamburger on the top-left and select "My Credentials".  Click on the card representing your credential to see the values stored on your device.

### 3: Display XYZ issuer details 

   * In order to properly verify that a user has a credential issued by a particular flow, you will need some issue information.  In order to display that information,
   go to [your flows](https://verity-flow.pps.evernym.com/flows)and find the appropriate issuance flow.  Click on the pencil icon on the issuance flow whose information you want.  Then scroll to the bottom of the screen and you'll see information similar to the following:

   ![issuer-flow-info](./images/issuer-flow-info.png)

   * For this tutorial, we will use the `Credential Definition ID`, so copy and save that value.

### 4: Create ABC Verifier

   * Go back to [Verity Flow](https://verity-flow.pps.evernym.com/flows), click on "Flows" on the left-hand panel, and click the "Create New Flow" button again.

   * For #1, select "Verify" for the "Flow Template", and for the "Verification Flow Name", enter a name which reflects the type of verification being performed (e.g. "DFS Employee Verification").

   * For #2, add an `Attribute name` for each attribute you want to verify.  You may require multiple attributes from the same credential or from different credentials, known as a composite proof.  The attribute name must exactly match the name of an attribute issued.  For example, the following screen demonstrates asking for a single attribute called "name" which must come from a credential identified by the credential definition ID previously copied.

   ![verify-condition](./images/verify-condition.png)

   * For #3, you may customize any of the prompts that you will see each time the flow is executed; however, you need not change any of the default values.

   * For #4, you may customize the logo or colors if you want, or just leave the default values.

   * Click "Save Flow".

### 5: ABC verifies Employee Credential 

   * Click "Flows" on the left-hand panel and you'll see one line for each flow that you have created so far.  Click "Run Flow" for the verification flow that you want to run.  You will see a screen with a QR code as follows:

   ![scan-verify](./images/scan-verify.png)
   
   * Open the Connect.Me mobile app and click the "Scan" button on the lower-right corner of the home screen.  Scan the QR code displayed by the Verity Flow application.  You should see a "Proof Request" screen on your mobile device with the names and values of the attributes that you are being asked to share.  Click the "Share Attributes" button.

   * You should then see a screen similar to the following on your Verity Flow application.

   ![display-values](./images/display-values.png)
