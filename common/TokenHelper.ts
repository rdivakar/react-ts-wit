import * as SDK from 'azure-devops-extension-sdk';
import { UserAgentApplication } from 'msal';
import { extensionConfig } from './Constants';

interface IAadConfiguration {
  rootUrl: string;
  clientId: string;
  tenantId?: string;
  loginHint?: string;
}

let aadConfiguration: IAadConfiguration;
let userAgentApplication: UserAgentApplication;

async function getConnectionData(): Promise<any> {
  let response: any;
  try {
    const token = await SDK.getAccessToken();
    const response = await fetch(
      `https://dev.azure.com/${SDK.getHost().name}/_apis/ConnectionData`,
      {
        headers: [
          ['Authorization', `Bearer ${token}`],
          ['X-TFS-FedAuthRedirect', 'Suppress'],
        ],
        credentials: 'same-origin',
      }
    );

    return response.json();
  } catch (e) {
    console.log('get connection data fail: ' + e);
  }
  return response;
}

async function getLoginConfig(): Promise<
  { tenantId: string; userId: string } | undefined
> {
  let connectionData = await getConnectionData();

  if (
    connectionData &&
    connectionData.authenticatedUser &&
    connectionData.authenticatedUser.descriptor
  ) {
    const result: string[] =
      connectionData.authenticatedUser.descriptor.split(';');
    if (result && result.length > 1) {
      const userInfo = result[1].split('\\');
      if (userInfo && userInfo.length > 0) {
        return {
          tenantId: userInfo[0],
          userId: userInfo[1],
        };
      }
    }
  }

  return undefined;
}

function getBaseUrl(): string {
  let url = window.location.href;
  return url.substr(0, url.lastIndexOf('/dist/') + '/dist'.length);
}

export async function initializeAadAuth(): Promise<void> {
  const userInfo = await getLoginConfig();

  // Store configuration for further reuse.
  aadConfiguration = {
    clientId: extensionConfig.ExtensionAppId,
    tenantId: userInfo?.tenantId,
    rootUrl: getBaseUrl(),
    loginHint: userInfo?.userId,
  };

  // Store MSAL object for further reuse.
  userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: aadConfiguration.clientId,
      authority: `https://login.microsoftonline.com/${aadConfiguration.tenantId}`,
      redirectUri: `${aadConfiguration.rootUrl}/aad.html`,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  });
}

export async function getAADToken(...scopes: string[]): Promise<string> {
  const authResponse = await userAgentApplication.acquireTokenSilent({
    scopes,
    loginHint: aadConfiguration.loginHint,
  });

  return authResponse.accessToken;
}

let appToken: string;

export async function initializeAuth(): Promise<void> {
  try {
    const token = await SDK.getAppToken();
    appToken = token;
  } catch (e) {
    console.log('get connection data fail: ' + e);
  }
}

export async function getAppToken(): Promise<string> {
  return appToken;
}

export function getUserName(): string {
  return SDK.getUser().name;
}

export function getOrganization(): string {
  return SDK.getHost().name;
}
