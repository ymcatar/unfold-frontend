import React from 'react';
import uuid from 'node-uuid';
import { connect } from 'react-redux';

import Bar from './Bar.jsx';

import { Day as Colors } from 'config/colors';

import { scrollToDate as stream_scrollToDate } from 'redux/actions/stream';
import { scrollToDate as raw_scrollToDate } from 'redux/actions/raw';

const styles = {
    text: {
        margin: '10px 2px 10px auto',
        textAlign: 'right',
        color: Colors.date,
        fontWeight: 'bolder',
        lineHeight: '0.5'
    },
    main: {
        margin: '30px 0 0 0'
    }
};

class Day extends React.Component {
    render() {
        let bars = [];
        let hash = this.props.data;
        let size = hash.total;
        let [year, month, day] = this.props.date;

        for (let i = 23; i >= 0; i--) {
            let length = 12 * Math.sqrt(hash[i] / size * 144);
            if (size === 0)
                length = 0;
            bars.push((
                <Bar
                    key={uuid.v1()}
                    label={i < 10? '0'+i: i}
                    length={length}
                    onClick={this.props.onTravel.bind(this, new Date(year, month - 1, day, i))} />
            ));
        }

        return (
            <div style={styles.main}>
                <div style={styles.text}>{month}</div>
                <div style={styles.text}>{day}</div>
                <div>{bars}</div>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {};
    },
    function dispatchToProps(dispatch, props) {
        switch (props.type) {
            case 'stream':
                return { onTravel: date => dispatch(stream_scrollToDate(date)) };
            case 'raw':
                return { onTravel: date => dispatch(raw_scrollToDate(date)) };
        }
    }
)(Day);
