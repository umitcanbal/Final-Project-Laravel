import React from "react";
import "./layout.css"

import Header from "../Header/Header.jsx";
import LayoutLeft from "../LayoutLeft/LayoutLeft.jsx";
import LayoutRight from "../LayoutRight/LayoutRight.jsx";


export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      desktop: true,
      width: window.innerWidth,
      videoPageOn: false,
    }
  }

  componentWillMount() {
    if(this.state.width < 900) {
      this.setState( { desktop: false } )
    }
  }

  isVideoPageOn = () => {
    if(this.state.videoPageOn === false) {
      this.setState ( { videoPageOn: true } )
    } else {
      this.setState ( { videoPageOn: false } )
    }
  }

  render() {

    if(this.state.desktop) {

      return(
        <div>
          <Header />
          <div className="layout-sides">
            <LayoutLeft />
            <LayoutRight />
          </div>
        </div>
      )
    } else {

      if(this.state.videoPageOn === false) {
        return(
          <div>
            <Header />
            <LayoutLeft isVideoPageOn={this.isVideoPageOn}/>
          </div>
        )
      } else {

        return(
          <div>
            <Header videoPageOn={this.state.videoPageOn} isVideoPageOn={this.isVideoPageOn}/>
            <LayoutRight />
          </div>
        )
      }
    }
  }
}
