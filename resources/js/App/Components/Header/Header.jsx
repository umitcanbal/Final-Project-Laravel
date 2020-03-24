import React from "react";

import "./header.css";
import { Link } from "react-router-dom";


class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Link to={`/`}>
        <button onClick={this.props.changeThePage}>
          {"<"}
        </button>
      </Link>
    )
  }
}


export default class Header extends React.Component {

  render() {
    return(
      <div className="header">
        {
          this.props.videoPageOn
          &&
          <Button changeThePage={this.props.isVideoPageOn}/>
        }
        <div className="header-text">Writing from Header</div>
      </div>
    )
  }
}
