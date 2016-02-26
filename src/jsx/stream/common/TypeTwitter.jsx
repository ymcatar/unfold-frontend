import React from 'react';
import _ from 'lodash';
import fetch from 'fetch-jsonp';

let twttrInit = new Promise(resolve => {
    window.twttr.ready(resolve);
});

export default class TypeTwitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };
    }

    componentDidMount() {
        let path = this.props.data.source.path.trim();
        let extra;
        if (path.trim().match(/^[0-9]+$/g))
            extra = 'id=' + path;
        else
            extra = 'url=' + path;

        fetch('https://api.twitter.com/1/statuses/oembed.json?' + extra)
            .then(res => res.json())
            .then(body => {
                this.setState({
                    body: body.html
                });
            });
    }

    shouldComponentUpdate() {
        return !this.state.body; // Ensures component is updated exactly once
    }

    componentDidUpdate() {
        twttrInit
            .then(() => window.twttr.widgets.load(this.bodyNode))
            .then(() => {
                if (!this.bodyNode)
                    return;
                this.bodyNode.style.removeProperty('display');
                setTimeout(() => {
                    if (this.props.onResize)
                        this.props.onResize();
                }, 1000);
            });
    }

    render() {
        return (
            <div
                ref={x => { this.bodyNode = x; }}
                style={{display: 'none'}}
                dangerouslySetInnerHTML={{__html: this.state.body}} />
        );
    }
}
