import React from 'react';

import { Card as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        width: '100%',
        maxWidth: '100%',
        borderTop: `1px solid ${Colors.borderColor}`,
        borderBottom: `1px solid ${Colors.borderColor}`,
        padding: '20px',
        backgroundColor: Colors.backgroundColor,
        color: Colors.color,
        boxShadow: Colors.zDepth
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
