import React from 'react';

import Colors from 'config/Colors.jsx';

const styles = {
    main: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: 'white',
        boxShadow: Colors.zDepth,
        padding: '15px'
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
