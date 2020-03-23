import React from 'react';

import Layout from "./Layout/Layout.jsx";


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
            <Layout />
        )
    }
}