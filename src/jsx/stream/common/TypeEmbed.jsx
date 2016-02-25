import React from 'react';
import _ from 'lodash';
import fetch from 'fetch-jsonp';

export default class TypeEmbed extends React.Component {

    static fetchProps(someProps) {
        return fetch('http://noembed.com/embed?url=' + someProps.path.trim())
            .then(res => res.json())
            .then(body => _.extend({
                body: body.html
            }, someProps));
    }

    componentDidMount() {
        if (this.props.onResize)
            this.node.addEventListener('load', this.props.onResize, true);
    }

    componentWillUnmount() {
        if (this.props.onResize)
            this.node.removeEventListener('load', this.props.onResize, true);
    }

    render() {
        return (
            <div
                ref={x => { this.node = x; }}
                dangerouslySetInnerHTML={{__html: this.props.body}} />
        );
    }
}
