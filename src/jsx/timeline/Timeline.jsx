import React from 'react';

import { connect } from 'react-redux';
import { scrollToDate } from 'redux/actions/stream';

import uuid from 'node-uuid';
import moment from 'moment';

import { Timeline as Colors } from 'config/Colors.jsx';

import Day from './common/Day.jsx';

const styles = {
    main: {
        backgroundColor: Colors.backgroundColor,
        width: '70px',
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '20px 0 50px 0',
        boxShadow: Colors.zDepth,
        zIndex: 3
    }
};

class Timeline extends React.Component {
    render() {
        let bars = [];

        let data = this.props.data.map(item => moment(item.submitTime));
        data = data.sort((a, b) => b - a);

        let hash = {};
        data.forEach(item => {
            let time = JSON.stringify([item.format('YYYY'), item.format('MM'), item.format('DD') ]);
            let hour = item.format('H');
            if (!hash[time]) {
                hash[time] = {};
                hash[time].total = 0;
                for (let i = 0; i < 24; i++)
                    hash[time][i] = 0;
            }
            hash[time].total++;
            hash[time][hour]++;
        });

        for (let key in hash) {
            bars.push((
                <Day key={uuid.v1()} data={hash[key]} date={JSON.parse(key)} onTravel={this.props.onTravel} />
            ));
        }

        return (
            <div style={styles.main}>{bars}</div>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return { data: state.stream.filteredStream };
    },
    function dispatchToProps(dispatch, props) {
        return {
            onTravel: date => dispatch(scrollToDate(date))
        };
    }
)(Timeline);
