import React from 'react';

import Colors from 'config/Colors.jsx';

const getStyles = length => ({
    backgroundColor: Colors.mid.bar,
    width: `${length/100*80}px`,
    height: '20px',
    margin: '0 5px 0 auto'
});

let styles = {
    main: {
        height: '20px',
        margin: '0 10px 2px 0',
        display: 'flex'
    },
    label: {
        width: '10px',
        fontWeight: 'bolder',
        color: Colors.mid.color
    }
};

export default class Bar extends React.Component {
    render() {
        let length = Math.min(this.props.length, 100);
        return (
            <div style={styles.main}>
                <div style={getStyles(length)} />
                <div style={styles.label}>
                    {this.props.label}
                </div>
            </div>
        );
    }
}
