import React from "react";
import "./videopage.css"


export default class VideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.alias !== prevProps.match.params.alias) {
      { this.setState( { currentVideo: 0, changed: true } ) }
    }
  }

  nextVideo = () => {
    this.setState( { currentVideo: this.state.currentVideo+1, changed: false } )
  }

  render() {
    const { keywordList } = this.props;
    const  { videos }  = keywordList.find((word) => {
      return (word.alias === this.props.match.params.alias)
    });

    return (
      <div>
        {this.state.changed && this.state.currentVideo != 0 ? <div>loading</div> : 
          <div> 
            <div dangerouslySetInnerHTML={{ __html: getIframeCode(videos[this.state.currentVideo]) }} />
            <button onClick={this.nextVideo}>Next</button>
          </div>}
      </div>
    )
  }
}


function getIframeCode(currentVideo) {
  const url = currentVideo ? currentVideo.URL : ""
  const offsetStart = getOffsetStart(currentVideo)
  const offsetFinish = offsetStart + 5

  const parameters = {
    cc_load_policy: 1,
    cc_lang_pref: 'en',
    start: offsetStart,
    end: offsetFinish
  }

  return  `<iframe width="560" height="315" src="https://www.youtube.com/embed/${url}${getEmbedParametersString(parameters)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}

function getOffsetStart(currentVideo) {
  return Math.max(((currentVideo ? currentVideo.pivot.offset_start : 0) - 5), 0)
}

function getEmbedParametersString(parameters) {
  const parametersMap = Object.entries(parameters)
  if (!parametersMap.length) return ''

  return `?${parametersMap.map(([key, value], index) => {
    const keyValueString = `${key}=${value}`
    return index === parametersMap.length - 1 ? keyValueString : keyValueString + '&'
  })}`
}