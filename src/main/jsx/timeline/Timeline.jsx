import React from 'react';
import uuid from 'node-uuid';
import moment from 'moment';
import { connect } from 'react-redux';

import { Timeline as Colors } from 'config/colors';

import { getTimegram } from 'redux/actions/ajax';

import Day from './common/Day.jsx';

const styles = {
    main: {
        backgroundColor: Colors.backgroundColor,
        minWidth: '50px',
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '20px 0 50px 0'
    }
};

let toDateArray = date => ([
    moment(date).format('YYYY'),
    moment(date).format('MM'),
    moment(date).format('DD')
]);

class Timeline extends React.Component {

    componentWillMount() {
        this.props.getTimegram(this.props.eventId);
    }

    render() {
        let bars = [];
        let hash = {};

        if (!this.props.timeline)
            return null;

        let { begin, end } = this.props.timeline.span;

        let { timegram } = this.props.timeline;

        timegram.forEach(item => {
            let time = JSON.stringify(toDateArray(item.begin));
            let hour = moment(item.begin).format("H");
            if (!hash[time]) {
                hash[time] = {};
                for (let i = 0; i < 24; i++)
                    hash[time][i] = 0;
                hash[time].total = 0;
            }
            hash[time][hour] = item.frequency;
            hash[time].total += hash[time][hour];
        });

        for (let key in hash)
            bars.push((
                <Day
                    type={this.props.type}
                    key={uuid.v1()}
                    data={hash[key]}
                    date={JSON.parse(key)} />
            ));

        return (
            <div style={styles.main}>{bars}</div>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            timeline: state.timeline,
            eventId: state.ui.eventId
        };
    },
    function dispatchToProps(dispatch, props) {
        return {
            getTimegram: (eventId) => dispatch(getTimegram(eventId))
        };
    }
)(Timeline);
