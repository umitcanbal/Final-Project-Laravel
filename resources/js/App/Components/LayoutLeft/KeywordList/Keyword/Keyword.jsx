import React from "react";
import "./keyword.css";

export default class Keyword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="keyword">
        <p>Writing from Keyword</p>
        <div>
          {this.props.keywordList.map( keyword => {
            return <div key={keyword.id}>{keyword.name}</div>
          } )}
        </div>
      </div>
    )
  }
}