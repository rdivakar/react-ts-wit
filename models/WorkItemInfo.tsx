import {
  WorkItem,
  WorkItemType,
  WorkItemIcon,
} from 'azure-devops-extension-api/WorkItemTracking';

export default interface WorkItemInfo extends WorkItem {
  Title: string;
  Icon: WorkItemIcon;
  Type: WorkItemType;
}
