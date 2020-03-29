import React from "react";
import "./keywordlist.css";

import Keyword from "../Keyword/Keyword.jsx";

export default class KeywordList extends React.Component {

  render() {
    const { keywordList } = this.props;
    return(
      <div className="keywordlist">
        <p>Writing from KeywordList</p>
        {
          keywordList.length > 0 
          &&
          <Keyword keywordList={keywordList} isVideoPageOn={this.props.isVideoPageOn}/>
        }
      </div>
    )
  }
}