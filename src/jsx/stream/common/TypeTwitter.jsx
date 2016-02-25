import React from 'react';
import _ from 'lodash';
import fetch from 'fetch-jsonp';
import uuid from 'node-uuid';

export default class TypeTwitter extends React.Component {

    static fetchProps(someProps) {
        let extra;
        if (someProps.path.trim().match(/^[0-9]+$/g))
            extra = 'id=' + someProps.path.trim();
        else
            extra = 'url=' + someProps.path.trim();

        return fetch('https://api.twitter.com/1/statuses/oembed.json?' + extra)
            .then(res => res.json())
            .then(body => _.extend({
                id: uuid.v1(),
                body: body.html,
                init: true
            }, someProps));
    }

    componentDidMount() {
        window.twttr.ready(twttr => {
            window.twttr.widgets.load(document.getElementById(this.props.id))
                .then(() => {
                    document.getElementById(this.props.id).style.removeProperty('display');
                    if (this.props.onResize)
                        this.props.onResize();
                });
        });
    }

    render() {
        return (
            <div
                id={this.props.id}
                style={{display: 'none'}}
                dangerouslySetInnerHTML={{__html: this.props.body}} />
        );
    }
}
