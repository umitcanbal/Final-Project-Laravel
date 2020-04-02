import React from "react";
import "./videopage.css";
import "../../videoPlayer.js";
import {subtitles} from './subtitles.js';

export default class VideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: 0,
      nextButton: false,
      keyword: '',
    };

    this.player = null;
    this.timeDetectorInterval = null;
  }

  componentDidMount() {
    if (this.props.alias) {
        this.startVideo();
    }
  }

  componentWillUnmount() {
    this.unsetVideoPlayer()
  }

  componentDidUpdate(prevProps) {
    if (this.props.alias !== prevProps.alias) {
      this.setState({ currentVideo: 0}, this.startVideo);
    }
  }

  startVideo = async () => {
    const { alias } = this.props;
    const res = await fetch(`/api/keywords/${alias}`);

    if (!res.ok) {
        throw Error(`Could not fetch videos by alias ${alias}`);
    }
    
    const keyword = await res.json();

    if(this.state.currentVideo === keyword.videos.length) this.setState({currentVideo: 0});

    setTimeout(() => {
      this.setVideoPlayer(keyword.videos[this.state.currentVideo]);
      this.setState({keyword: keyword.name});
    }, 700);

  };

  unsetVideoPlayer = () => {
    clearInterval(this.timeDetectorInterval);
    if (this.player) {
      this.player.destroy()
      this.player = null
    }
  };

  nextVideo = () => {
    this.setState({ currentVideo: this.state.currentVideo + 1, nextButton: true }, this.startVideo);
  };

  setVideoPlayer = async (currentVideo) => {
    this.unsetVideoPlayer();

    const url = currentVideo ? currentVideo.URL : "";

    const offsetStart = getOffsetStart(currentVideo);
    const offsetFinish = offsetStart + 10;

    const parameters = {
      controls: 0,
      cc_load_policy: 1,
      cc_lang_pref: 'en',
      start: offsetStart,
      end: offsetFinish,
      rel: 0,
    };

    this.player = await window.getYoutubePlayer(url, parameters);
    this.player.playVideo();

    this.setState({ nextButton: false });

    this.timeDetectorInterval = setInterval(() => {
      if (this.player.getPlayerState()) {
        this.setState({
          currentVideoTime: player.getCurrentTime(),
        })
      }
    }, 100)

  };

  render() {
    
    let subtitlesForTheSpecificVideo;
    if(this.state.keyword) {
      subtitlesForTheSpecificVideo = subtitles[this.state.keyword][this.state.currentVideo];
    }
    
    let text;
    const highlight = this.state.keyword;
    
    if (subtitlesForTheSpecificVideo) {
      subtitlesForTheSpecificVideo.map((subtitle) => {
        if (this.state.currentVideoTime > subtitle.start && this.state.currentVideoTime < subtitle.end) {
          text = subtitle.text;
        }
      })
    }

    return (
          <div className="videopage">
            <h1> {highlight ? `Friends: "${highlight}"` : 'Loading...'} </h1>
            <div id='player'></div>
            <div style={{ height: "2rem" }}>{getHighlightedText(text, highlight)}</div>
            <button className="nextbtn" onClick={this.nextVideo}>Next</button>
          </div>
    )
  }
}


function getOffsetStart(currentVideo) {
  return Math.max(((currentVideo ? currentVideo.pivot.offset_start : 0) - 5), 0)
}

function getHighlightedText(text, highlight) {
  if (!text) return
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <p style={{ margin: "0" }}>{parts.map((part, index) => part.toLowerCase() === highlight.toLowerCase() ? <span key={`sub-${index}`} style={{ color: "red", fontSize: "1.2rem" }}>{part.toUpperCase()}</span> : part)}</p>;

}

// ************table columns => keyword / subtitles*******************






// 111
// 00:09:31,583 --> 00:09:35,747
// There's a nuclear holocaust.
// l'm the last man on earth.

// 112
// 00:09:36,121 --> 00:09:38,316
// Would you go out with me?


// {"start_time":"00:09:31,583","end_time":"00:09:35,747","text":"There's a nuclear holocaust.\nl'm the last man on earth."},{"start_time":"00:09:36,121","end_time":"00:09:38,316","text":"Would you go out with me?"},


// {start_time: "00:09:31,583", end_time: "00:09:35,747", text: "There's a nuclear holocaust"}


// {currentVideo: 0, nextButton: false, changed: false, currentVideoTime: 7.145191}





















// 111
// 00:09:31,583 --> 00:09:35,747
// There's a nuclear holocaust.
// l'm the last man on earth.

// 112
// 00:09:36,121 --> 00:09:38,316
// Would you go out with me?

// let subtitles = [
//   {start: "150", end: "154.2" text: "There's a nuclear holocaust.\nl'm the last man on earth."},
//   {start: "156.2", end: "160" text: "Would you go out with me?"},
// ]


// let subtitle = this.state.....
// subtitle = {start_time: "00:09:31,583", end_time: "00:09:35,747", text: "There's a nuclear holocaust"}

// let firstSentenceTime = offset_start-5;
// let secondSentenceTime = firstSentenceTime + subtitle["end_time"] - subtitle["start_time"];

// let subtitleModified = {
//   firstSentenceTime: subtitle[0]["text"],

//   secondSentenceTime: subtitle[1]["text"],
// }

// if(player.getCurrentTime() > firstSentence && player.getCurrentTime() < secondSentence) {
//   text = subtitleModified["firstSentenceTime"];
// } else if(player.getCurrentTime() > secondSentence && player.getCurrentTime() < thirdSentence) {
//   text = subtitleModified["secondSentenceTime"];
// }

// let highlight = this.props.keywordList[0].name;

// function getHighlightedText(text, highlight) {
//   // Split text on highlight term, include term itself into parts, ignore case
//   const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
//   return <p>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <span style={{ color: "red", fontSize: "3rem"}}>{part.toUpperCase()}</span> : part)}</p>;
// }

// render(
//   <>{getHighlightedText(text, highlight)}</>
// )




// {"start_time":"00:09:31,583","end_time":"00:09:35,747","text":"There's a nuclear holocaust.\nl'm the last man on earth."},{"start_time":"00:09:36,121","end_time":"00:09:38,316","text":"Would you go out with me?"},


// {start_time: "00:09:31,583", end_time: "00:09:35,747", text: "There's a nuclear holocaust"}


// {currentVideo: 0, nextButton: false, changed: false, currentVideoTime: 7.145191}


// subtitles = [
//   {start: "150", end: "154.2" text: "There's a nuclear holocaust.\nl'm the last man on earth."},
//   {start: "156.2", end: "160" text: "Would you go out with me?"},
// ]
