import React, {Component} from 'react';
import {Helmet} from "react-helmet";

class HEADER extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            loading: true
        };
    }

    componentDidMount() {
        this.getInfos();
    }

    getInfos() {
        this.setState({
            title: this.props.title,
            loading: false})
    }

    render() {
        return (
                <Helmet>
                    <title>{ this.state.title }</title>
                    <meta charSet={ 'utf-8' } />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Helmet>
        )
    }
}

export default HEADER;