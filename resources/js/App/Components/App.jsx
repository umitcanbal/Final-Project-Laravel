import React from 'react';

import Layout from "./Layout/Layout.jsx";


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onDesktop: true,
        }
    }
    componentDidMount() {
        if (window.innerWidth < 900) {
            this.setState({ onDesktop: false })
        }
    }

    render() {
        return (
            <Layout onDesktop={this.state.onDesktop} />
        )
    }
}

// Move all state up here with regards to getting keywords, videos, and current video

/*
App >
    If Desktop return <DesktopLayout />
    OR return <MobileLayout />

    ** such as **
     render() {
        return (
            <>
                <Header onDesktop={this.state.onDesktop} />
                {this.state.onDesktop ? <DesktopLayout /> : <MobileLayout />}
            </>
        )
    }

Desktop Layout >
    We have a router that manages the left/right view

    return (
        <BrowserRouter>
            <ControlPanel (LayoutLeft)/>
            <Switch>

            </Switch>
        </BrowserRouter>
    )

MobileLayout >
    Another Router To manage the mobile view

*/