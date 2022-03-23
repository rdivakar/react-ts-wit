import { IHeaderCommandBarItem } from 'azure-devops-ui/HeaderCommandBar';
import { MenuItemType } from 'azure-devops-ui/Menu';

export const commandBarItemsAdvanced: IHeaderCommandBarItem[] = [
  {
    iconProps: {
      iconName: 'Refresh',
    },
    id: 'refreshList',
    onActivate: () => {
      window.location.reload();
    },
    text: 'Reload',
  },
];
