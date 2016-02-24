import React from 'react';
import uuid from 'node-uuid';

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

    render() {
        return (
            <div style={styles.post}>
                <a href={this.props.src.path} target="_blank">Link</a>
            </div>
        );
    }
}
