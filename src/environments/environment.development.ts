import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  // issuer: 'https://idsvr4.azurewebsites.net',

  oidc: false,

  loginUrl: 'https://accounts.spotify.com/authorize',

  // gipewog618@elixirsd.com

  // URL of the SPA to redirect the user to after login
  redirectUri: globalThis.location?.origin + '/index.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '39745076a05d4b4d84e8bc53243c20c6',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',
  responseType: 'token',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'user-read-private user-read-email',

  customQueryParams: {
    show_dialog: 'true',
  },

  showDebugInformation: true,
};

export const environment = {
  // placki: process.env['PLACKI']
  authConfig,
  api_url: 'https://api.spotify.com/v1/',
};
