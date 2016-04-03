import React from 'react';
import { connect } from 'react-redux';

import { ErrorView as Colors } from 'config/colors';

const styles = {
    main: {
        padding: '30px'
    },
    title: {
        fontSize: '8vw',
        fontWeight: 'lighter',
        color: Colors.title
    }
};

class ErrorView extends React.Component {
    render() {
        return (
            <div style={styles.main}>
                Error
            </div>
        );
    }
}

export default connect (
    function stateToProps(state) {
        return {};
    },
    function dispatchToProps(dispatch, props) {
        return {
        };
    }
)(ErrorView);
