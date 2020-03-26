import React from "react";
import "./videopage.css"
import ReactPlayer from 'react-player'

// class VideoPlayer extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
    
//     return(
//       <div>
//         <ReactPlayer url={this.props.url} controls={true} />
//         {console.log(this.props.url)}
//       </div>
//     )
//   }
// }


export default class VideoPage extends React.Component {
  render() {
    console.log('videoProps', this.props);
    // console.log("benim proplaar", this.props.match.params.alias);
    const { keywordList } = this.props;
    const  { videos }  = keywordList.find((word) => {
      // console.log("word.alias buluyorum", word.alias);
      // console.log("ahan da eşleşenler", word.alias === this.props.match.params.alias);
      return (word.alias === this.props.match.params.alias)
    });
    // const a = keywordList.find((firstElement) => {return(firstElement.id === 2)});
    // console.log("anın değeri", a);
    console.log('videos', videos);

    // const video = videos[this.state.currentVideo]
    const video = { 
      id: 'C2aVAKD2mx0',
      start: 20,
      end: 25,

    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id}?controls=0&cc_load_policy=1&start=${video.start}&end=${video.end}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` }} />
      </div>
    )
  }
  // {
  //   console.log("renderdaki this.state", this.state);

  //   return(
  //     <div className="videopage">
  //       <p>Writing from VideoPage</p>
  //       {
  //         this.props.match.params.alias !== null && this.state.videos.length > 0
  //         &&
  //         <div>
  //           {/* {console.log(this.state.videos[0].URL)} */}
  //           <div>URLs of the videos matching with this keyword that has id: "{this.state.videos[0].pivot.keyword_id}" are listed  below;
  //             {/* <ul>
  //               {this.state.videos.map( (video, index) => { return( <VideoPlayer key={index} url={video.URL}/> ) } )}
  //             </ul> */}
  //             {/* <ul>
  //               {this.state.videos.map( (video, index) => { return( <li key={index}>{video.URL}</li> ) } )}
  //             </ul> */}
  //             <VideoPlayer url={this.state.videos[0].URL} />
  //           </div>
  //         </div>
  //       }
  //     </div>
  //   )
  // }
}