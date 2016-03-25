import React from 'react';

import { Card as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        width: '100%',
        padding: '20px',
        backgroundColor: Colors.backgroundColor,
        color: Colors.color,
        border: `1px solid ${Colors.borderColor}`,
        borderBottomWidth: '2px',
        borderTopWidth: '0px',
        borderRadius: '3px',
        margin: '2px 10px 2px 10px',
        overflow: 'scroll'
    }
};

export default class Card extends React.Component {
    render() {
        return (
            <div style={styles.main}>
                {this.props.children}
            </div>
        );
    }
}
