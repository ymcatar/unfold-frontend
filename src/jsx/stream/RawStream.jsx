import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import UpdateBox from './common/UpdateBox.jsx';

const styles = {
    main: {
        backgroundColor: Colors.stream.backgroundColor,
        height: '100vh',
        width: '100%',
        paddingBottom: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        width: '200px',
        color: Colors.stream.header,
        borderBottom: `2px ${Colors.stream.headerBorder} solid`,
        padding: '0 10px 5px 10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        fontWeight: '300',
        fontStyle: 'italic'
    }
};

export default class RawStream extends React.Component {
    render() {
        let elements = this.props.completeStream.map(post => (
            <UpdateBox
                key={post.id}
                data={post}
                small={this.props.small}
                handleVerify={this.handleVerify} />
        ));
        return (
            <div style={styles.main}>
                {elements}
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return _.pick(state.raw, 'completeStream');
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(RawStream);
