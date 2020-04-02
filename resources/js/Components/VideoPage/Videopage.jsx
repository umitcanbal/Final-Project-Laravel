import React from "react";
import "./videopage.css";
import "../../videoPlayer.js";

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

    const subtitles = {
      "would": {
        0: [
          { start: 3, end: 7.2, text: "There's a nuclear holocaust.\nl'm the last man on Earth." },
          { start: 7.7, end: 13, text: "Would you go out with me?" },
        ],
        1: [
          { start: 122, end: 123.631, text: "What happened Joey?" },
          { start: 125.0, end: 126.430, text: "All right." },
          { start: 126.705, end: 128.605, text: "We swore we would never tell." },
          { start: 128.640, end: 132, text: "They'll never understand." },
        ],
        2: [
          { start: 230, end: 233.18, text: "She's my friend and she needed help." },
          { start: 233.520, end: 239, text: "lf l had to, l would pee on any one of you." },
        ],
        3: [
          { start: 30, end: 32.93, text: "You should give yourself credit." },
          { start: 33.741, end: 37.268, text: "My mom never thought this would work out." },
          { start: 38.229, end: 41.0, text: "She was all, ''Once a cheater, always a cheater.''" },
        ],
        4: [
          { start: 154.3, end: 157.163, text: "You know, if we were a couple, we could play this game naked." },
          { start: 158.071, end: 160.071, text: "Would you stop?" },
          { start: 160.205, end: 161.666, text: "Okay. All right." },
          { start: 162.441, end: 163.820, text: "Okay. All right." },
        ],
      },
      "have to": {
        0: [
          { start: 52, end: 53.3, text: "We gotta do something" },
          { start: 53.54, end: 55, text: "But there's really only one thing you can do" },
          { start: 55.2, end: 56.3, text: "What? What is it?" },
          { start: 56.54, end: 57.8, text: "You are gonna have to pee on it" },
          { start: 59.3, end: 60.3, text: "What?!" },
          { start: 60.8, end: 62, text: "Gross!" },
        ],
        1: [
          { start: 129, end: 130.631, text: "They'll never understand." },
          { start: 133.5, end: 135.1, text: "But we have to say something" },
          { start: 135.5, end: 136.3, text: "We have to get it out." },
          { start: 136.3, end: 138, text: "lt's eating me alive!" },
        ],
        2: [
          { start: 110, end: 111.18, text: "She's gonna be replaced." },
          { start: 111.520, end: 113, text: "That's not going to happen, is it?" },
          { start: 115, end: 117.018, text: "I have to return a call in the other room" },
          { start: 117.3, end: 118.518, text: "Why can't you use the phone here" },
          { start: 118.6, end: 120, text: "Well, I'm returning a call" },
        ],
        3: [
          { start: 154, end: 155.7, text: "You are not gonna suck me into this." },
          { start: 156, end: 156.5, text: "Sure, I am" },
          { start: 157.6, end: 159.7, text: "Because you always have to be right." },
          { start: 159.9, end: 160.4, text: "I do not always have to be" },
          { start: 161.4, end: 163, text: "Okay, okay." },
        ],
        4: [
          { start: 202.5, end: 203.3, text: "Do we have to tell her?" },
          { start: 203.8, end: 205.5, text: "Yes, we have to tell her" },
          { start: 205.8, end: 207.2, text: "But it's made her so happy" },
          { start: 209, end: 210, text: "Little girl" },
        ],
        5: [
          { start: 212, end: 215, text: "Crazy lady thinks her mother is in a cat." },
          { start: 215.5, end: 218.6, text: "Okay. You know what, I have to go have dinner with my son." },
          { start: 218.7, end: 221.3, text: "Can I trust that when you see Phoebe, you will tell her?" },
        ],
      },
      "nothing": {
        0: [
          { start: 112.5, end: 114, text: "What happened out there?" },
          { start: 114.7, end: 116.3, text: "What? We took a walk." },
          { start: 116.3, end: 118, text: "Nothing happened." },
          { start: 118.3, end: 120.8, text: "l came back with nothing all over me." },
        ],
        1: [
          { start: 10, end: 10.4, text: "Crazy!" },
          { start: 11.7, end: 12.3, text: "Oh, my God!" },
          { start: 13, end: 13.6, text: "What?" },
          { start: 14, end: 15, text: "Nothing." },
          { start: 16, end: 19.5, text: "What's wrong?" },
        ],
      },
      "too": {
        0: [
          { start: 4.5, end: 5.5, text: "I missed you" },
          { start: 6.5, end: 8.2, text: "I missed you too" },
        ],
      },
    };
    
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
          <div>
            <div id='player'></div>
            <div style={{ height: "2rem" }}>{getHighlightedText(text, highlight)}</div>
            <button onClick={this.nextVideo}>Next</button>
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
