import React from "react";
import "./layout.css"

import Header from "../Header/Header.jsx";
import LayoutLeft from "../LayoutLeft/LayoutLeft.jsx";
import LayoutRight from "../LayoutRight/LayoutRight.jsx";

// import Introduction from "./Introduction/Introduction.jsx";
// import VideoPage from "./VideoPage/Videopage.jsx";
// import { Switch, Route } from "react-router-dom";


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
    if(this.state.width <= 900) {
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
  //   return(
  //     <>
  //       <Header />
  //       <div className="layout-sides">
  //         <LayoutLeft />
  //         <LayoutRight>
  //           <Switch>
  //             <Route exact path="/" component={Introduction} />
  //             <Route exact path="/videos/:alias" component={VideoPage} />
  //           </Switch>
  //         <LayoutRight />
  //       </div>
  //     </>
  //   )
  // }

    if(this.state.desktop === true) {
      return(
        <>
          <Header />
          <div className="layout-sides">
            <LayoutLeft />
            <LayoutRight />
          </div>
        </>
      )
    } else {

      if(this.state.videoPageOn === false) {
        return(
          <>
            <Header />
            <LayoutLeft />
          </>
        )
      } else {
        return(
          <>
            <Header changeThePage={this.isVideoPageOn} videoPageOn={this.state.videoPageOn} />
            <LayoutRight />
          </>
        )
      }
    }
  }
}