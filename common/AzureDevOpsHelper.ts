import * as API from 'azure-devops-extension-api';
import * as SDK from 'azure-devops-extension-sdk';

import { WorkRestClient, WorkItemColor } from 'azure-devops-extension-api/Work';

import WorkItemInfo, { WorkItemInfo } from '../models/WorkItemInfo';

import {
  WorkItem,
  WorkItemTrackingRestClient,
  Wiql,
  WorkItemQueryResult,
  WorkItemBatchGetRequest,
  WorkItemExpand,
  WorkItemErrorPolicy
} from 'azure-devops-extension-api/WorkItemTracking';

import {
  CommonServiceIds,
  IProjectPageService,
  IHostNavigationService,
  INavigationElement,
  IPageRoute,
} from 'azure-devops-extension-api';

const wiRestClient: WorkRestClient = API.getClient(WorkRestClient);

const witRestClient: WorkItemTrackingRestClient = API.getClient(
  WorkItemTrackingRestClient
);

export async function getWorkItemsByQuery(
  query: string
): Promise<WorkItemInfo> {
  try {
    
    let wiql: Wiql = { query: this.query };
    let qResult: WorkItemQueryResult = await witRestClient.queryByWiql(
      wiql,
      getProjectName()
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error getting Workitem using Wiql');
  }
}

export async function getWorkItemById(id: number): Promise<Array<WorkItemInfo>> {}


export function getProjectName():string {
  const projectService = await SDK.getService<IProjectPageService>(
    CommonServiceIds.ProjectPageService
  );
  const project = await projectService.getProject();
  let projectName: string = 'OE';
  if (project) {
    projectName = project.name;
  }
  return projectName;
}

export function getWorkItemInfo(workItem:WorkItem): WorkItemInfo {

  let workItemInfo: WorkItemInfo = {
    WorkItem:workItem,
    Title:workItem.fields['System.Title'],
    Icon:workItem
  };

  return workItemInfo;
}

async function getWorkItemsFromueryResult(
  workItemQueryResult: WorkItemQueryResult
): Promise<Array<WorkItemInfo>>{

  let workItemInfos: Array<WorkItemInfo> = [];

  let workItemIds:number[] = workItemQueryResult.workItems.map(function(val,index):number{
    return val.id;
  })


  let workItemQueryRequest:WorkItemBatchGetRequest = {ids:workItemIds, $expand:WorkItemExpand.All, errorPolicy:WorkItemErrorPolicy.Fail};


  let workItems:WorkItem[] = await witRestClient.getWorkItemsBatch(workItemQueryRequest,getProjectName());

  if(workItems.length > 0)
  {
    workItems.forEach( item => {
      workItemInfos.push(
        {
         

        });
    });
  }
  return workItemInfos;

}
