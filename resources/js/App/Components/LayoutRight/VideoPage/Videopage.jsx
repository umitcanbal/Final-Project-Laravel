import React from "react";
import "./videopage.css"


export default class VideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: 0,
      nextButton: false,
    }
  }

  async componentDidMount() {
    const { keywordList } = this.props;
    const { videos } = await keywordList.find((word) => {
      return (word.alias === this.props.match.params.alias)
    });
    this.setVideoPlayer(videos[this.state.currentVideo])
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.alias !== prevProps.match.params.alias) {
      { this.setState({ currentVideo: 0, changed: true }) }
    }
  }

  async nextVideo() {
    await this.setState({ currentVideo: this.state.currentVideo + 1, nextButton: true });
    const { keywordList } = this.props;
    const { videos } = await keywordList.find((word) => {
      return (word.alias === this.props.match.params.alias)
    });
    
    // player.destroy();
    
    setTimeout(() => {
      this.setVideoPlayer(videos[this.state.currentVideo]);
    }, 500);
    
  }

  setVideoPlayer = async (currentVideo) => {
    console.log("tekrardan video player")
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
    
    await this.setState({nextButton: false});


    player = await window.getYoutubePlayer(url, parameters);
    
    
    // console.log(player);
    player.playVideo();
    
    

    const timeDetector = setInterval(() => { // TODO Clear all intervals when necessary! (component unmounting, switching to another video)
      this.setState({
        currentVideoTime: player.getCurrentTime()
      })

      if(this.state.nextButton) {
        console.log("next butonunun içindeyim")
        // player.parentNode.removeChild(player)
        // window.removeChild(player);
        player.destroy(player);
        // console.log(player);
        clearInterval(timeDetector);
        console.log("next butonuna bastığın için videoyu durdurdum");
      }
    }, 500)

    // function onPlayerStateChange() {
    //   if('state is stopped') clearIn
    // }
  }

  render() {
    // const { keywordList } = this.props;
    // const { videos } = keywordList.find((word) => {
    //   return (word.alias === this.props.match.params.alias)
    // });
    console.log(this.state);
    // const { currentVideoTime } = this.state
    // console.log('current', currentVideoTime)
    return (
      <div>
        {this.state.changed && this.state.currentVideo != 0 ? <div>loading</div> :
          <div>
            <div id='player'></div>
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
