import React from 'react';

import Colors from 'config/Colors.jsx';

const styles = {
    main: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: Colors.card.backgroundColor,
        color: Colors.card.color,
        borderTop: `1px solid ${Colors.card.borderColor}`,
        borderBottom: `1px solid ${Colors.card.borderColor}`,
        padding: '20px',
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
