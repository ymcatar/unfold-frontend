import React from 'react';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';

import { EventDetail as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        marginTop: '20px',
        marginBottom: '30px'
    },
    h1: {
        color: Colors.color,
        fontSize: '5vh',
        fontWeight: 'bolder',
        lineHeight: '90%'
    },
    h2: {
        marginTop: '20px',
        color: Colors.color,
        opacity: 0.8
    },
    info: {
        marginBottom: '5px',
        paddingLeft: '5px',
        borderLeft: `2px solid ${Colors.color}`,
        color: Colors.color,
        opacity: 0.5
    }
};

export default class EventDetail extends React.Component {
    render() {
        let startedAt = moment(this.props.startedAt).format('ll');
        let endedAt = moment(this.props.endedAt).format('ll');
        let { location } = this.props;
        return (
            <div style={styles.main}>
                <div style={styles.h1}>{this.props.title}</div>
                <p style={styles.h2}>{this.props.description}</p>
                <p style={styles.info}>
                    {startedAt} - {endedAt}<br/>
                    {location}
                </p>
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
