import React from "react";

import "./header.css";


class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoPage: false,
    }
  }

  render() {
    return(
      <button onClick={this.props.changeThePage}>{">"}</button>
    )
  }
}


export default class Header extends React.Component {

  render() {
    return(
      <div className="header">
        <div className="header-text">Writing from Header</div>
        {
          this.props.videoPageOn
          &&
          <Button changeThePage={this.props.changeThePage}/>
        }
      </div>
    )
  }
}
