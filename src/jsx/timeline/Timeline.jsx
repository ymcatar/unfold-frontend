import React from 'react';
import uuid from 'node-uuid';
import moment from 'moment';
import { connect } from 'react-redux';

import { Timeline as Colors } from 'config/colors';

import * as StreamAction from 'redux/actions/stream';
import * as RawAction from 'redux/actions/raw';

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

class Timeline extends React.Component {
    render() {
        let bars = [];

        let data = this.props.data.map(item => moment(item.submitTime));
        data = data.sort((a, b) => b - a);

        let hash = {};
        data.forEach(item => {
            let time = JSON.stringify([
                item.format('YYYY'),
                item.format('MM'),
                item.format('DD')
            ]);

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
                <Day
                    type={this.props.type}
                    key={uuid.v1()}
                    data={hash[key]}
                    date={JSON.parse(key)} />
            ));
        }

        return (
            <div style={styles.main}>{bars}</div>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        switch (props.type) {
            case 'stream':
                return {data: state.stream.filteredStream};
            case 'raw':
                return {data: state.raw.filteredStream};
        }
    },
    function dispatchToProps(dispatch, props) {
        return {};
    }
)(Timeline);
