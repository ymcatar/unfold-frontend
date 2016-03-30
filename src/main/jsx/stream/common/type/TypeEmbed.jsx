import React from 'react';
import _ from 'lodash';
import fetch from 'fetch-jsonp';

export default class TypeEmbed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rendered: false, body: '' };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loaded && !this.state.rendered)
            fetch('http://noembed.com/embed?url=' + this.props.path.trim())
                .then(res => res.json())
                .then(body => {
                    this.setState({ body: body.html });
                })
                .then(() => {
                    let onScroll = (event) => {
                        this.elm.style.height = 'auto';
                        this.state.rendered = true; // avoid rerendering
                        document.removeEventListener('mousewheel', onScroll, false);
                    };
                    document.addEventListener('mousewheel', onScroll, false);
                });
    }

    render() {
        if (!this.props.loaded)
            return null;

        return (
            <div ref={x => { this.elm = x; }} dangerouslySetInnerHTML={{__html: this.state.body}} />
        );
    }
}
