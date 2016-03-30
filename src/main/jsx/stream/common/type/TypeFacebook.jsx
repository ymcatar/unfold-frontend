import React from 'react';

const styles = {
    post: {
        borderLeft: '5px solid #EEEEEE',
        padding: '0px 0px 0px 10px',
        minHeight: '100px'
    },
    fb: {
        width: '100% !important',
        overflowY: 'hidden',
        overflowX: 'scroll',
        height: '100px'
    }
};

let fbInit = new Promise(resolve => {
    if (window.FB) {
        resolve();
        return;
    }
    let other = window.fbAsyncInit;
    window.fbAsyncInit = () => {
        resolve();
        if (other) other();
    };
});

export default class TypeFacebook extends React.Component {

    constructor(props) {
        super(props);
        this.state = { rendered: false };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loaded && !this.state.rendered)
            fbInit.then(() => {
                return new Promise(resolve => { window.FB.XFBML.parse(this.elm, resolve); });
            })
            .then(() => {
                let onScroll = (event) => {
                    this.embedElm.style.height = 'auto';
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
            <div ref={x => { this.elm = x; }} style={styles.post}>
                <div
                    ref={x => {this.embedElm = x;}}
                    style={styles.fb}
                    className="fb-post"
                    data-href={this.props.path}
                    data-width="450" />
            </div>
        );
    }
}
