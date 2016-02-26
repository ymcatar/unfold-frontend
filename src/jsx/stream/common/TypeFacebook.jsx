import React from 'react';

import markdown from 'common/Markdown.js';

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

export default class TypeFacebook extends React.Component {

    static fetchProps(someProps) {
        return Promise.resolve(someProps);
    }

    componentDidMount() {
        if (window.FB) {
            window.FB.XFBML.parse(this.bodyNode, () => {

                if (this.props.onResize)
                    this.props.onResize();
            });
        }
    }

    render() {
        return (
            <div>
                <p dangerouslySetInnerHTML={{__html: markdown(this.props.data)}} />
                <div
                    ref={x => { this.bodyNode = x; }}
                    style={styles.post}>
                    <div
                        style={styles.fb}
                        className="fb-post"
                        data-href={this.props.path}
                        data-width="450">
                    </div>
                </div>
            </div>
        );
    }
}
