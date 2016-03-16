import React from 'react';

import Colors from 'config/Colors.jsx';

const styles = {
    main: {
        width: '100%',
        maxWidth: '100%',
        borderTop: `1px solid ${Colors.card.borderColor}`,
        borderBottom: `1px solid ${Colors.card.borderColor}`,
        padding: '20px',
        backgroundColor: Colors.card.backgroundColor,
        color: Colors.card.color,
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
