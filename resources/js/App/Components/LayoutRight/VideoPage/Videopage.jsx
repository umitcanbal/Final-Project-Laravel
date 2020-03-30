import React from "react";
import "./videopage.css"


export default class VideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: 0,
      nextButton: false,
      changed: false,
    }
  }

  async componentDidMount() {
//     let exampleJSON = '{"start_time":"00:09:31,583","end_time":"00:09:35,747","text":"There's a nuclear holocaust.\nl'm the last man on earth."}';

// let exampleDecoded = JSON.parse(exampleJSON);
// console.log(JSON.parse('{ "start_time":"00:09:31,583", "end_time":"00:09:35,747", "text":"There\'s a nuclear holocaust"}'));,
var obj = JSON.parse('{ "start_time":"00:09:31,583", "end_time":"00:09:35,747", "text":"There\'s a nuclear holocaust"}');
console.log(obj);
    const { keywordList } = this.props;
    const { videos } = await keywordList.find((word) => {
      return (word.alias === this.props.match.params.alias)
    });
    this.setVideoPlayer(videos[this.state.currentVideo])
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.alias !== prevProps.match.params.alias) {
    await this.setState({ currentVideo: 0, changed: true });

      const { keywordList } = this.props;
      const { videos } = await keywordList.find((word) => {
        return (word.alias === this.props.match.params.alias)
      });

      setTimeout(() => {
        this.setVideoPlayer(videos[this.state.currentVideo]);
      }, 700);
    }

  }

  async nextVideo() {
    await this.setState({ currentVideo: this.state.currentVideo + 1, nextButton: true });
    const { keywordList } = this.props;
    const { videos } = await keywordList.find((word) => {
      return (word.alias === this.props.match.params.alias)
    });

    setTimeout(() => {
      this.setVideoPlayer(videos[this.state.currentVideo]);
    }, 500);
  }

  setVideoPlayer = async (currentVideo) => {
    const url = currentVideo ? currentVideo.URL : ""
  
    const offsetStart = getOffsetStart(currentVideo)
    const offsetFinish = offsetStart + 10

    const parameters = {
      cc_load_policy: 1,
      cc_lang_pref: 'en',
      start: offsetStart,
      end: offsetFinish,
      rel: 0,
    }

    player = await window.getYoutubePlayer(url, parameters);
    player.playVideo();

    await this.setState({nextButton: false});
    
    const timeDetector = setInterval(() => {

      if(player.getPlayerState()) {
        this.setState({
          currentVideoTime: player.getCurrentTime(),
        })
      }

      if(this.state.nextButton || this.state.changed) {
        clearInterval(timeDetector);
        player.destroy();
        this.setState({ changed: false })
      }

    }, 500)

  }

  render() {
    let text = "There's a nuclear holocaust.\nl'm the last man on earth. Would you go out with me?";
    console.log(this.props.keywordList[0].name);
    let highlight = this.props.keywordList[0].id;

    function getHighlightedText(text, highlight) {
      // Split text on highlight term, include term itself into parts, ignore case
      const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
      return <p>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <span style={{ color: "red", fontSize: "3rem"}}>{part.toUpperCase()}</span> : part)}</p>;
  }
    return (
      <div>
        {this.state.changed && this.state.currentVideo != 0 ? <div>loading</div> :
          <div>
            <div id='player'></div>
            <>{getHighlightedText(text, highlight)}</>
            <button onClick={this.nextVideo.bind(this)}>Next</button>
            <p style={{ fontWeight: 'bold' }}>My Text</p>
          </div>}
      </div>
    )
  }
}

// consantly get the current time of the video
// when the current time ~ matches the time of the sentence / keyword
// change the styling of the keyword to bold or whatever



function getOffsetStart(currentVideo) {
  return Math.max(((currentVideo ? currentVideo.pivot.offset_start : 0) - 5), 0)
}


