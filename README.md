# Basic CRUD App with Angular 9.0 and Spring Boot 2.1
 
This example app shows how to build a basic CRUD app with Spring Boot 2.1, Spring Data, and Angular 9.0.
## Getting Started
To install this example application, run the following commands:
```bash
git clone https://github.com/cloudtraining/spring-boot-angular-security.git
cd spring-boot-angular-security
```

### Create a Firebase App
#### Server Configuration
1. In Firebase console navigate to Project Settings > Service Accounts and select "Generate New Private Key"
2. Save the json contents from step 1 into `server/src/main/resources/firebase-server-config.json`
3. Now the spring boot app should be able to start.

#### Client Configuration
1. In Firebase console navigate to Project Settings > General and add a new web app
2. Save the firebaseConfig object contents into the firebaseConfig property in the `client/src/environments/environment.ts`
3. Now the angular client should be able to start.

### For the PKCE demo with OKTA
You will need to setup an okta application with PKCE client authentication.  
The demonstration does not use the OKTA libraries directly (as you should in real world use cases) so you will need to
adjust the clientId and AuthUrl properties in the pkceConfig in `client/src/app/shared/auth/auth.service.ts`.


## Running the apps
To install all of its dependencies and start each app, follow the instructions below.
To run the server, cd into the `server` folder and run:

```bash
./mvnw spring-boot:run
```
To run the client, cd into the `client` folder and run: 
```bash
npm install && npm start
```

Then visit http://localhost:4200/home in your browser.

## License
Apache 2.0, see [LICENSE](LICENSE).
