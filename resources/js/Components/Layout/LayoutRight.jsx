import React from "react";

export default class LayoutRight extends React.Component {
  render() {
    return (
      <div className="layout__right">
        {this.props.children}
      </div>
    )
  }
}