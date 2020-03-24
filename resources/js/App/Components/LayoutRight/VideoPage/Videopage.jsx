import React from "react";
import "./videopage.css"

export default class VideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    }
  }

  componentDidMount() {
    fetch(`/api/videos/${this.props.match.params.alias}`)
      .then( response => (response.json()) )
      .then( data => { this.setState( { videos: data } ) })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.alias !== prevProps.match.params.alias) {
      fetch(`/api/videos/${this.props.match.params.alias}`)
        .then( response => (response.json()) )
        .then( data => { this.setState( { videos: data } ) })
    }
  }

  render() {
    return(
      <div className="videopage">
        <p>Writing from VideoPage</p>
        {
          this.props.match.params.alias !== null && this.state.videos.length > 0
          &&
          <div>
            <div>URLs of the videos matching with this keyword that has id: "{this.state.videos[0].pivot.keyword_id}" are listed  below;
              <ul>
                {this.state.videos.map( (video, index) => { return( <li key={index}>{video.URL}</li> ) } )}
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}