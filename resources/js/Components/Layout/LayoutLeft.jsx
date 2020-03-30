import React from "react";

export default class LayoutLeft extends React.Component {
  render() {
    return(
      <div className="layout__left">
        {this.props.children}
      </div>
    )
  }
}