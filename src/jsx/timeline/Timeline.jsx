import React from 'react';
import uuid from 'node-uuid';
import moment from 'moment';

import Day from './common/Day.jsx';

const styles = {
    main: {
        padding: '20px 0 5px 0',
    }
};

export default class Timeline extends React.Component {
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
                    key={uuid.v1()}
                    date={JSON.parse(key)}
                    data={hash[key]} />
            ));
        }

        return (
            <div style={styles.main}>
                {bars}
            </div>
        );
    }
}
