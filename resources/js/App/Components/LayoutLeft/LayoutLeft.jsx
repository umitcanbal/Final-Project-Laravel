import React from "react";
import "./layoutleft.css";

import KeywordList from "./KeywordList/KeywordList.jsx";

export default class LayoutLeft extends React.Component {
  render() {
    return(
      <div className="layoutleft">
        <p>Writing from LayoutLeft</p>
        <KeywordList />
      </div>
    )
  }
}