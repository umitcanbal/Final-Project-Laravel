import React from "react";
import "./layoutright.css";

import Introduction from "./Introduction/Introduction.jsx";
import VideoPage from "./VideoPage/Videopage.jsx";
import { Switch, Route } from "react-router-dom";

export default class LayoutRight extends React.Component {
  render() {
    return (
      <div className="layoutright">
        <p>Writing from LayoutRight</p>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route exact path="/videos/:alias" render={(props) => (<VideoPage keywordList={this.props.keywordList} {...props} />) }/>
        </Switch>
      </div>
    )
  }
}