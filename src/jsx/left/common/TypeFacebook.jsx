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

    componentDidMount() {
        if (window.FB)
            window.FB.XFBML.parse();
    }

    render() {
        return (
            <div>
                <p dangerouslySetInnerHTML={{__html: markdown(this.props.data)}} />
                <div style={styles.post}>
                    <MediaQuery maxWidth={780}>
                        <div
                            className="fb-post"
                            id={this.state.id}
                            data-width={"350"}
                            data-href={this.props.src.path} />
                    </MediaQuery>

                    <MediaQuery minWidth={780}>
                        <div
                            className="fb-post"
                            id={this.state.id}
                            data-width={"500"}
                            data-href={this.props.src.path} />
                    </MediaQuery>
                </div>
            </div>
        );
    }
}
