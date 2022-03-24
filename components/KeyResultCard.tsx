import * as React from 'react';
import { Card, ICardProps } from 'azure-devops-ui/Card';
import {
  CustomHeader,
  HeaderDescription,
  HeaderIcon,
  HeaderTitle,
  HeaderTitleArea,
  HeaderTitleRow,
  TitleSize,
} from 'azure-devops-ui/Header';
import WorkItemInfo from '../models/WorkItemInfo';
import { Link } from 'azure-devops-ui/Components/Link/Link';

import { Image } from 'azure-devops-ui/Image';
import { Header } from 'azure-devops-ui/Header';
import { IdentityCardHeaderElement } from 'azure-devops-ui/Identity';
import { Toggle } from 'azure-devops-ui/Toggle';

export default class KeyResultCard extends React.Component<WorkItemInfo, any> {
  private onChangeTracking(event, value): void {}

  private renderCustomHeader(): JSX.Element {
    return (
      <div>
        <CustomHeader className="bolt-header-with-commandbar">
          <Image containImage={true} src={this.props.Icon.url} />
          <HeaderTitleArea>
            <HeaderTitleRow>
              <HeaderTitle
                ariaLevel={3}
                className="text-ellipsis"
                titleSize={TitleSize.Large}
              >
                <Link href={this.props.url} subtle={true}>
                  {' '}
                  {this.props.id} {this.props.Title}{' '}
                </Link>
              </HeaderTitle>
            </HeaderTitleRow>
            <HeaderDescription>
              <IdentityCardHeaderElement
                identity={this.props.fields['System.AssignedTo']}
              ></IdentityCardHeaderElement>
            </HeaderDescription>
          </HeaderTitleArea>
          <Toggle
            offText={'Off'}
            onText={'On'}
            checked={this.props.IsTracking}
            onChange={this.onChangeTracking}
          />
        </CustomHeader>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <Card
        className="master-example-panel show-on-small-screens subtle-border no-v-padding"
        titleProps={{ text: 'Test', size: TitleSize.Large }}
        renderHeader={this.renderCustomHeader}
      >
        <div></div>
      </Card>
    );
  }
}

const CardHeader: React.SFC<ICardProps> = (props) => {
  const {
    collapsible,
    titleProps = {},
    headerBreakpoints,
    headerClassName,
    headerCommandBarItems,
    headerDescriptionProps = {},
    headerIconProps,
  } = props;
  const { text, className, id, size, ariaLevel } = titleProps;
  return (
    <Header
      className={css(
        headerClassName,
        'bolt-card-header',
        collapsible && 'bolt-card-header-collapsible'
      )}
      commandBarItems={headerCommandBarItems}
      description={headerDescriptionProps.text}
      descriptionClassName={headerDescriptionProps.className}
      headerBreakpoints={headerBreakpoints}
      titleId={id}
      titleIconProps={headerIconProps}
      title={text}
      titleAriaLevel={ariaLevel}
      titleClassName={className}
      titleSize={size}
    />
  );
};
