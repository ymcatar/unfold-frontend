import React from 'react';

const styles = {
    main: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        border: '3px #FFFFFF solid',
        borderRadius: '2px',
        padding: '10px'
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
