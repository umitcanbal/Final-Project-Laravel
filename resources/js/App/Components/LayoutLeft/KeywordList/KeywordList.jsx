import React from "react";
import "./keywordlist.css";

import Keyword from "./Keyword/Keyword.jsx";

export default class KeywordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keywordList: [],
    }
  }

  componentDidMount() {
    fetch("api/keywords")
      .then( (response) => { return (response.json()) } )
      .then( (data) => { this.setState( { keywordList: data } ) } )
  }

  render() {
    const { keywordList } = this.state;
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