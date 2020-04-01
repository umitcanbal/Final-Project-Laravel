import React from "react";
import "./keyword.css";

import { NavLink } from "react-router-dom";

export default class Keyword extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {keyword} = this.props;

    return(
      <NavLink className="keyword" to={`/videos/${keyword.alias}`} onClick={this.props.isVideoPageOn} activeClassName="keyword__selected">              
          {keyword.name}
      </NavLink>
    )
  }
}
