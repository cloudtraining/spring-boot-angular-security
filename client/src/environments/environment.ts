// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  httpEndpoint: 'http://localhost:8080',
  firebaseConfig : {
    apiKey: "AIzaSyCh54PmNdy5kPEk-PzY_ySuAdGtESeLFwg",
    authDomain: "dev-nexus-2020.firebaseapp.com",
    databaseURL: "https://dev-nexus-2020.firebaseio.com",
    projectId: "dev-nexus-2020",
    storageBucket: "dev-nexus-2020.appspot.com",
    messagingSenderId: "720797766768",
    appId: "1:720797766768:web:53d8b805b7df2a3ee190b5"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
