import React from "react";
import "./layout.css"

import Header from "../Header/Header.jsx";
import LayoutLeft from "../LayoutLeft/LayoutLeft.jsx";
import LayoutRight from "../LayoutRight/LayoutRight.jsx";


export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoPageOn: false,
      keywordList: []
    }
  }

  componentWillMount() {
    fetch("/api/keywords")
      .then((response) => { return (response.json()) })
      .then((data) => {
        this.setState({ keywordList: data })
      })
  }

  toggleVideoPageOn = () => {
    this.setState({ videoPageOn: !this.state.videoPageOn })
  }

  render() {
    console.log('this.props', this.props)
    if (this.props.onDesktop) {
      return (
        <div>
          <Header />
          <div className="layout-sides">
            <LayoutLeft keywordList={this.state.keywordList} />
            <LayoutRight keywordList={this.state.keywordList} />
          </div>
        </div>
      )
    }

    if (!this.state.videoPageOn) {
      return (
        <div>
          <Header />
          <LayoutLeft keywordList={this.state.keywordList} isVideoPageOn={this.toggleVideoPageOn} />
        </div>
      )
    }

    return (
      <div>
        <Header videoPageOn={this.state.videoPageOn} isVideoPageOn={this.toggleVideoPageOn} />
        <LayoutRight keywordList={this.state.keywordList} />
      </div>
    )


  }
}
