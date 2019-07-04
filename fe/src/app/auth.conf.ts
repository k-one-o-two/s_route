import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://www.strava.com/oauth/authorize',
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',
  clientId: '36713',
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'profile',
}
