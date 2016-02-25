import React from 'react';
import uuid from 'node-uuid';
import fetch from 'fetch-jsonp';
import MediaQuery from 'react-responsive';

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

    constructor() {
        super();
        this.state = {
            id: uuid.v1()
        };
    }

    componentDidMount() {
        if (window.FB)
            window.FB.XFBML.parse(document.getElementById(this.state.id));
    }

    render() {
        return (
            <div>
                <p dangerouslySetInnerHTML={{__html: markdown(this.props.data)}} />
                <div style={styles.post}>
                    <div
                        style={styles.fb}
                        className="fb-post"
                        data-href={this.props.src.path}
                        data-width="450">
                    </div>
                </div>
            </div>
        );
    }
}
