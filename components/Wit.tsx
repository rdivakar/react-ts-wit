import '../wit.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Image } from 'azure-devops-ui/Image';
import { Page } from 'azure-devops-ui/Page';

import { Tab, TabBar, TabBadge } from 'azure-devops-ui/Tabs';

import {
  CustomHeader,
  HeaderDescription,
  HeaderIcon,
  HeaderTitle,
  HeaderTitleArea,
  HeaderTitleRow,
  TitleSize,
} from 'azure-devops-ui/Header';

import { Status, Statuses, StatusSize } from 'azure-devops-ui/Status';
import { HeaderCommandBar } from 'azure-devops-ui/HeaderCommandBar';
import { commandBarItemsAdvanced } from './HeaderData';
import { Spinner } from 'azure-devops-ui/Spinner';

import {
  ObservableValue,
  ObservableArray,
} from 'azure-devops-ui/Core/Observable';

import { Observer } from 'azure-devops-ui/Observer';

import WorkItemsTab from './WorkItemsTab';
import SettingsTab from './SettingsTab';

export default class Wit extends React.Component {
  private selectedTabId = new ObservableValue<string>('workitems');
  private loadingIcon = new ObservableValue<boolean>(false);

  private onSelectedTabChanged = (newTabId: string) => {
    this.selectedTabId.value = newTabId;
  };

  private renderStatus = (className?: string) => {
    return (
      <Status {...Statuses.Success} className={className} size={StatusSize.l} />
    );
  };

  private getPageContent() {
    if (this.selectedTabId.value === 'workitems') {
      return <WorkItemsTab />;
    } else {
      return <SettingsTab />;
    }
  }

  public render() {
    return (
      <Page className="listing-page sl-background-white flex-grow">
        <div
          className="flex-column padding-32"
          style={{ width: '100%', flex: 2 }}
        >
          <div className=" list-horizon margin-bottom-20">
            <div
              className="list-horizon"
              style={{ flex: 2, textAlign: 'right' }}
            >
              <CustomHeader className="bolt-header-with-commandbar">
                <HeaderTitleArea>
                  <HeaderTitleRow>
                    <HeaderTitle
                      ariaLevel={1}
                      className="text-ellipsis"
                      titleSize={TitleSize.Large}
                    >
                      Work Item Tracking (WIT)
                    </HeaderTitle>
                  </HeaderTitleRow>
                  <HeaderDescription>
                    Dashboard to track Objectives and Key Results
                  </HeaderDescription>
                </HeaderTitleArea>
                <HeaderCommandBar items={commandBarItemsAdvanced} />
              </CustomHeader>
            </div>
          </div>

          <TabBar
            selectedTabId={this.selectedTabId}
            onSelectedTabChanged={this.onSelectedTabChanged}
          >
            <Tab id="workitems" name="Work Items" />
            <Tab id="settings" name="Settings" />
          </TabBar>
          <Observer show={this.loadingIcon}>
            {(props: { show: boolean }) => {
              return props.show ? (
                <div className="flex-grow spinner-div margin-bottom-10">
                  <Spinner label="Loading" />
                </div>
              ) : null;
            }}
          </Observer>

          <Observer selectedTabId={this.selectedTabId}>
            {() => {
              return (
                <div className="page-content page-content-top">
                  {this.getPageContent()}
                </div>
              );
            }}
          </Observer>
        </div>
      </Page>
    );
  }
}
