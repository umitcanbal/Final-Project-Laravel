import React from "react";
import "./keywordlist.css";

import Keyword from "./Keyword/Keyword.jsx";

export default class KeywordList extends React.Component {
  render() {
    return(
      <div className="keywordlist">
        <p>Writing from KeywordList</p>
        <Keyword />
      </div>
    )
  }
}