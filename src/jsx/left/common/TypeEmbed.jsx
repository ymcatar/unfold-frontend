import React from 'react';
import fetch from 'fetch-jsonp';
import uuid from 'node-uuid';

import markdown from 'common/Markdown.js';

export default class TypeEmbed extends React.Component {

    constructor() {
        super();
        this.state = {
            id: uuid.v1(),
            body: ''
        };
    }

    componentWillMount() {

        fetch('http://noembed.com/embed?url=' + this.props.src.path.trim())
            .then(res => res.json())
            .then(msg => {
                this.setState({ body: msg.html });
            })
            .catch(console.error.bind(console));
    }

    render() {
        return (
            <div>
                <p dangerouslySetInnerHTML={{__html: markdown(this.props.data)}} />
                <div
                    id={this.state.id}
                    dangerouslySetInnerHTML={{__html: this.state.body}} />
            </div>
        );
    }
}