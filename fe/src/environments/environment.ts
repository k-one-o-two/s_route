// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl: 'http://localhost:3000',

  oauth: {
    clientId: 36713,
    url: `https://www.strava.com/oauth/authorize?client_id=36713&response_type=code&redirect_uri=http://localhost:4200/get-code&approval_prompt=force`
    // url: 'http://www.strava.com/oauth/authorize?client_id=36713&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=profile:read'
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
