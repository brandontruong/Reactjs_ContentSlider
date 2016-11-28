import React from 'react';

export default class CollapsiblePanel extends React.Component {
  render() {
    return (
      <div className="collapsiblePanel">
        <h1><span><i className="fa fa-file fa-lg"></i></span>{this.props.title}</h1>
        <a className="collapsibleButton" href="javascript:;" onClick={this.props.onCollapsibleClicked}><i  className={"fa fa-lg " + (this.props.isCollapsed ? 'fa-caret-down' : 'fa-caret-up')}></i></a>
      </div>
    );
  }
}