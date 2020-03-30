import React from 'react';
import './app.css';
import Layout from "../Layout/Layout.jsx";
import KeywordList from '../KeywordList/KeywordList.jsx';
import {Switch, Route} from 'react-router-dom';

export default class App extends React.Component {
    state = {error: false}

    componentDidCatch(error, info) {
        this.setState({error: true});

        console.error(error, info);
    }

    render() {
        if (this.state.error) {
            return 'Ooops, something went wrong...';
        }

        return (
            <Switch>
                <Route exact path="/">
                    <Layout leftMenu={<KeywordList keywordList={this.state.keywords} />}>
                        I'm home page
                    </Layout>
                </Route>
                <Route exact path="/videos/:alias">
                    <Layout leftMenu={<KeywordList keywordList={this.state.keywords} />}>
                        I'm video page
                    </Layout>
                </Route>
                <Route render={() => '404'} />
            </Switch>
        )
    }
}
