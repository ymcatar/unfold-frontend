import React from 'react';
import _ from 'lodash';
import fetch from 'fetch-jsonp';
import uuid from 'node-uuid';

export default class TypeEmbed extends React.Component {

    static fetchProps(someProps) {
        return fetch('http://noembed.com/embed?url=' + someProps.source.path.trim())
			.then(res => res.json())
            .then(body => _.extend({
                id: uuid.v1(),
                body: body.html
            }, someProps));
    }

    render() {
        return (
            <div
                id={this.props.id}
                dangerouslySetInnerHTML={{__html: this.props.body}} />
        );
    }
}
