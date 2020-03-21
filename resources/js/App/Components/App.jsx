import React from 'react';

import Dropdown from "./Dropdown.jsx";
import Video from "./Video.jsx";


export default class App extends React.Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         keywords: null,
    //         videos: null,
    //     }
    // }

    // componentDidMount() {
    //     fetch("/api/something")
    //         .then(response => (response.json()))
    //         .then(data => this.setState({
    //             keywords: data[1], 
    //             videos: data[0]
    //         }))
    // }

    render() {
        return (
            <>
                <h1>Application component</h1>

                
            </>
        )

        // return (
        //     <>
        //         <Dropdown keywords={this.state.keywords}/>
        //         <Video videos={this.state.videos}/>
        //     </>
        // )
    }
}