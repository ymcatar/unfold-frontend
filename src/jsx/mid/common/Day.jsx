import React from 'react';
import uuid from 'node-uuid';

import Colors from 'config/Colors.jsx';

import Bar from 'mid/common/Bar.jsx';

const styles = {
    text: {
        position: 'relative',
        height: '20px',
        right: '-37px',
        color: Colors.mid.date
    },
    main: {
        margin: '0 0 20px 0'
    }
};

export default class Day extends React.Component {
    render() {

        let bars = [];
        let hash = this.props.data;
        let size = hash.total;

        for (let i = 23; i >= 0; i--) {
            bars.push((
                <Bar
                    key={uuid.v1()}
                    label={i < 10? '0'+i: i}
                    length={hash[i]/size*2*100}
                    heavier={i == '0'} />
            ));
        }

        let [year, month, day] = this.props.date;
        return (
            <div style={styles.main}>
                <b style={styles.text}>
                    {`${month}/${day}`}
                </b>
                <div>
                    {bars}
                </div>
            </div>
        );
    }
}
