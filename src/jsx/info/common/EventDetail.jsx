import React from 'react';

import { EventDetail as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        marginTop: '30px',
        marginBottom: '30px'
    },
    h1: {
        marginBottom: '20px',
        color: Colors.color,
        fontSize: '5vh',
        fontWeight: 'bolder',
        lineHeight: '90%'
    },
    h2: {
        color: Colors.color,
    }
};

export default class EventDetail extends React.Component {
    render() {
        return (
            <div style={styles.main}>
                <div style={styles.h1}>{this.props.title}</div>
                <p style={styles.h2}>{this.props.description}</p>
            </div>
        );
    }
}

let { string } = React.PropTypes;

EventDetail.propTypes = {
    title: string.isRequired,
    description: string.isRequired
};

EventDetail.defaultProps = {
    title: '',
    description: ''
};
