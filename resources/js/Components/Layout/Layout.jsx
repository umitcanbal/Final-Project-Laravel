import React from "react";
import classnames from 'classnames';
import {withRouter} from 'react-router';
import "./layout.css"
import LayoutLeft from "./LayoutLeft";
import LayoutRight from "./LayoutRight";
import Header from "../Header/Header.jsx";

class Layout extends React.Component {
  state = {leftMenuShown: false};

  onMenuToggle = () => this.setState({leftMenuShown: !this.state.leftMenuShown});

  componentDidUpdate(prevProps) {
    // Hide menu if it's currently shown and alias of the video has changed
    if (
      this.state.leftMenuShown
      && this.props.match.params.alias
      && this.props.match.params.alias !== prevProps.match.params.alias
    ) {
      this.setState({leftMenuShown: false});
    }
  }

  render() {
    const {leftMenuShown} = this.state;

    return(
      <div className="layout">
        <Header leftMenuShown={leftMenuShown} onMenuToggle={this.onMenuToggle} />
        <div className={classnames('layout__content', {'layout--left-menu-shown': leftMenuShown})}>
          <LayoutLeft>{this.props.leftMenu}</LayoutLeft>
          <LayoutRight>{this.props.children}</LayoutRight>
        </div>
      </div>
    )
  }
}

export default withRouter(Layout);

Layout.Left = LayoutLeft;
Layout.Right = LayoutRight;
