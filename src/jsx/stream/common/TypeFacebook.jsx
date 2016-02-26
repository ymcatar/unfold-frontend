import React from 'react';

const styles = {
    post: {
        borderLeft: '5px solid #EEEEEE',
        padding: '0px 0px 0px 10px'
    },
    fb: {
        width: '100% !important',
        overflowY: 'hidden',
        overflowX: 'scroll'
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
    componentDidMount() {
        return fbInit
            .then(() => {
                return new Promise(resolve => {
                    window.FB.XFBML.parse(this.bodyNode, resolve);
                });
            })
            .then(() => {
                setTimeout(() => {
                    if (this.props.onResize)
                        this.props.onResize();
                }, 1000);
            });
    }

    render() {
        return (
            <div>
                <div
                    ref={x => { this.bodyNode = x; }}
                    style={styles.post}>
                    <div
                        style={styles.fb}
                        className="fb-post"
                        data-href={this.props.data.source.path}
                        data-width="450">
                    </div>
                </div>
            </div>
        );
    }
}
