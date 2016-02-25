import React from 'react';
import Colors from 'config/Colors.jsx';

const styles = {
    main: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: 'white',
        boxShadow: Colors.zDepth,
        border: '3px #FFFFFF solid',
        borderRadius: '2px',
        padding: '10px'
    }
};

export default class ContributorEditor extends React.Component {
    render() {
        return (
            <div style={styles.main}>
                Testing.
            </div>
        );
    }
}
