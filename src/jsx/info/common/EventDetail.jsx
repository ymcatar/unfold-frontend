import React from 'react';
import Colors from 'config/Colors.jsx';

const styles = {
    main: {
        marginTop: '30px',
        marginBottom: '30px'
    },
    h1: {
        marginBottom: '20px',
        color: Colors.info.color,
        fontSize: '5vh',
        fontWeight: 'bolder',
        lineHeight: '90%'
    },
    h2: {
        color: Colors.info.color,
    }
};

export default class EventDetail extends React.Component {
    render() {
        return(
            <div style={styles.main}>
                <div style={styles.h1}>
                    {this.props.title}
                </div>
                <p style={styles.h2}>{this.props.description}</p>
            </div>
        );
    }
}
