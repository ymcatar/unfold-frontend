import React from 'react';
import _ from 'lodash';
import fetch from 'fetch-jsonp';
import { isElementInViewport } from 'common/util';

const styles = {
    main: {
        height: '100px',
        maxWidth: '500px'
    }
};

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
                    this.state.rendered = true; // avoid rerendering
                })
                .then(() => {
                    let onScroll = (event) => {
                        if (isElementInViewport(this.elm)) {
                            this.elm.style.height = 'auto';
                            document.removeEventListener('mousewheel', onScroll, false);
                        }
                    };
                    document.addEventListener('mousewheel', onScroll, false);
                });
    }

    render() {
        if (!this.props.loaded)
            return null;

        return (
            <div
                style={styles.main}
                ref={x => { this.elm = x; }}
                dangerouslySetInnerHTML={{__html: this.state.body}} />
        );
    }
}
