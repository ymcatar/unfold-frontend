import React from 'react';
import { Loading as Colors } from 'config/colors';

const styles = {
    main: loaded => ({
        display: loaded? 'none': 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '100px',
        height: '100vh',
        color: Colors.color
    })
};

export default class Loading extends React.Component {
    render() {
        return (
            <div style={styles.main(this.props.loaded)}>
                <i className="zmdi zmdi-rotate-right zmdi-hc-spin" />
            </div>
        );
    }
}
