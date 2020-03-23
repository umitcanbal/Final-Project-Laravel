import React from "react";
import "./layout.css"

import Header from "../Header/Header.jsx";
import LayoutLeft from "../LayoutLeft/LayoutLeft.jsx";
import LayoutRight from "../LayoutRight/LayoutRight.jsx";


export default class Layout extends React.Component {
  render() {
    return(
      <>
        <Header />
        <div className="layout-sides">
          <LayoutLeft />
          <LayoutRight />
        </div>
      </>
    )
  }
}