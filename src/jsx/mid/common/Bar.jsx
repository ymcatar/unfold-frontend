import React from 'react';

import Colors from 'config/Colors.jsx';

const styles = (length, heavier) => ({
    backgroundColor: heavier? Colors.mid.heavier: Colors.mid.lighter,
    width: `${length/100*50}px`,
    height: '20px',
    margin: '0 0 2px auto'
});

export default class Bar extends React.Component {
    render() {
        return (
            <div style={styles(this.props.length, this.props.heavier)}>

            </div>
        );
    }
}
