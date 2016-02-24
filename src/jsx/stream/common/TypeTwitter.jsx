import React from 'react';
import fetch from 'fetch-jsonp';
import uuid from 'node-uuid';

import markdown from 'common/Markdown.js';

export default class TypeTwitter extends React.Component {

    constructor() {
        super();
        this.state = {
            id: uuid.v1(),
            init: false,
            body: `<span class="fa fa-spin fa-spinner" />`
        };
    }

    componentWillMount() {
        let extra;
        if (this.props.src.path.trim().match(/^[0-9]+$/g))
            extra = 'id=' + this.props.src.path.trim();
        else
            extra = 'url=' + this.props.src.path.trim();

        fetch('https://api.twitter.com/1/statuses/oembed.json?' + extra)
            .then(res => res.json())
            .then(msg => {
                this.setState({ body: msg.html, init: true });
            })
            .catch(console.error.bind(console));
    }

    componentDidUpdate() {
        window.twttr.ready(twttr => {
            Promise.resolve(window.twttr.widgets.load(document.getElementById(this.state.id)))
                .then(() => {
                    document.getElementById(this.state.id).style.removeProperty('display');
                });
        });
    }

    render() {
        return (
            <div
                id={this.state.id}
                style={{display: 'none'}}
                dangerouslySetInnerHTML={{__html: this.state.body}} />
        );
    }
}
