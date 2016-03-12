import React from 'react';
import uuid from 'node-uuid';

import Colors from 'config/Colors.jsx';

import Bar from './Bar.jsx';

const styles = {
    text: {
        margin: '10px auto 10px 1px',
        color: Colors.timeline.date,
        fontWeight: '500'
    },
    main: {
        margin: '0 auto 20px 0px'
    }
};

export default class Day extends React.Component {
    render() {
        let bars = [];
        let hash = this.props.data;
        let size = hash.total;

        let [year, month, day] = this.props.date;
        for (let i = 23; i >= 0; i--) {
            let length = 12 * Math.sqrt(hash[i] / size * 144);
            bars.push((
                <Bar
                    key={uuid.v1()}
                    time={year + month + day + i}
                    label={i < 10? '0'+i: i}
                    length={length}
                    heavier={i === '0'}
                    onClick={this.props.onTravel.bind(this, new Date(year, month - 1, day, i))} />
            ));
        }

        return (
            <div style={styles.main}>
                <div style={styles.text}>
                    {`${month}/${day}`}
                </div>
                <div>
                    {bars}
                </div>
            </div>
        );
    }
}
