import React from "react";
import "./keywordlist.css";

import Keyword from "../Keyword/Keyword.jsx";

export default class KeywordList extends React.Component {
  state = {keywords: [], error: false};

  componentDidMount() {
    fetch("api/keywords")
      .then(response => response.json())
      .then(data => this.setState({keywords: data}))
      .catch(() => this.setState({error: true}));
  }

  render() {
    return(
      <div className="keywordlist">
        {this.state.error ? 'Error while fetching' : undefined}
        {this.state.keywords.map(foo => {
          return (
            <Keyword key={foo.id} keyword={foo} isVideoPageOn={this.propsisVideoPageOn}/>
          )
        })}
      </div>
    )
  }
}