import * as API from 'azure-devops-extension-api';

import { WorkRestClient, WorkItemColor } from 'azure-devops-extension-api/Work';

import { WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking';

const wiRestClient: WorkRestClient = API.getClient(WorkRestClient);

const witRestClient: WorkItemTrackingRestClient = API.getClient(
  WorkItemTrackingRestClient
);
