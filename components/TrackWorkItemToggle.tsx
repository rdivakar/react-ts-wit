import * as React from 'react';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { Toggle } from 'azure-devops-ui/Toggle';

const firstToggle = new ObservableValue<boolean>(false);

export default class TrackWorkItemToggle extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <Toggle
        offText={'Off'}
        onText={'On'}
        checked={firstToggle}
        onChange={(event, value) => (firstToggle.value = value)}
      />
    );
  }
}
