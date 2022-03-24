import {
  WorkItem,
  WorkItemType,
  WorkItemIcon,
} from 'azure-devops-extension-api/WorkItemTracking';

export default interface WorkItemInfo {
  WorkItem: WorkItem;
  Title: string;
  Icon: WorkItemIcon;
  Type: WorkItemType;
  IsTracking: boolean;
}
