import React from 'react';
import { connect } from 'react-redux';

import { ErrorView as Colors } from 'config/colors';

const styles = {
    main: {
        padding: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column'
    },
    title: {
        fontSize: '8vw',
        fontWeight: 'lighter',
        color: Colors.title
    },
    icon: {
        color: Colors.title,
        fontSize: '15vw'
    },
    text: {
        color: Colors.text,
        fontWeight: 'bolder',
        textAlign: 'center'
    }
};

class ErrorView extends React.Component {

    render() {
        return (
            <div style={styles.main}>
                <i style={styles.icon} className="zmdi zmdi-mood-bad" />
                <h1 style={styles.title}>Oops!</h1>
                <div style={styles.text}>
                    <br/>
                    The page you are looking for does not exist.
                    <br/>
                    Please return to the <a href="/">home page</a> and try again.
                </div>
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
