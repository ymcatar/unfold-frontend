import React from 'react';
import { isElementInViewport } from 'common/util';

const styles = {
    post: {
        borderLeft: '5px solid #EEEEEE',
        padding: '0px 0px 0px 10px',
        height: '100px'
    }
};

let twttrInit = new Promise(resolve => { window.twttr.ready(resolve); });

export default class TypeTwitter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { rendered: false };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loaded && !this.state.rendered) {
            let id = this.props.path.match(/[0-9]+/)[0];
            twttrInit
                .then(() => window.twttr.widgets.createTweet(id, this.elm))
                .then(() => {
                    this.state.rendered = true; // avoid rerendering
                    let onScroll = (event) => {
                        if (isElementInViewport(this.elm)) {
                            this.elm.style.height = 'auto';
                            document.removeEventListener('mousewheel', onScroll, false);
                        }
                    };
                    document.addEventListener('mousewheel', onScroll, false);
                });
        }
    }

    render() {
        return (
            <div style={styles.post} ref={x => { this.elm = x; }} />
        );
    }
}
