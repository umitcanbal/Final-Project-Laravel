import React from "react";
import "./layoutright.css";

import Introduction from "./Introduction/Introduction.jsx";
import VideoPage from "./VideoPage/Videopage.jsx";

export default class LayoutRight extends React.Component {
  render() {
    return(
      <div className="layoutright">
        <p>Writing from LayoutRight</p>
        <Introduction />
        <VideoPage />
      </div>
    )
  }
}