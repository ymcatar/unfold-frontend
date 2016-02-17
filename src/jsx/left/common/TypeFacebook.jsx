import React from 'react';
import uuid from 'node-uuid';
import fetch from 'fetch-jsonp';
import MediaQuery from 'react-responsive';

import markdown from 'common/Markdown.js';

const styles = {
    post: {
        overflow: 'scroll',
        borderLeft: '5px solid #EEEEEE',
        padding: '0px 0px 0px 10px'
    }
};

export default class TypeFacebook extends React.Component {

    constructor() {
        super();
        this.state = {
            id: uuid.v1()
        };
    }

    /*
    componentDidMount() {
        if (window.FB)
            window.FB.XFBML.parse();
    }
    */

    render() {
        return (
            <div>
                <p dangerouslySetInnerHTML={{__html: markdown(this.props.data)}} />
                <div style={styles.post}>
                    <a href={this.props.src.path} target="_blank">Link</a>
                </div>
            </div>
        );
    }
}
