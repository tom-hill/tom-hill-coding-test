import React from 'react';

export default class LineupView extends React.PureComponent {
  render() {
    return (
      <div>{JSON.stringify(this.props.data)}</div>
    );
  }
}
