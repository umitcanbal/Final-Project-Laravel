import React from "react";
import "./keyword.css";

import { Link } from "react-router-dom";

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
            return (
            <div key={keyword.id}>
              <Link to={`/videos/${keyword.alias}`} onClick={this.props.isVideoPageOn}>              
                  {keyword.name}
              </Link>
            </div>
            )
          } )}
        </div>
      </div>
    
    )
  }
}
