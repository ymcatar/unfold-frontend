import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import Colors from 'config/Colors.jsx';

const getStyles = (length, disable) => ({
    backgroundColor: disable? Colors.mid.disable: Colors.mid.enable,
    width: `${length/100*70}px`,
    height: '10px',
    margin: '0 2px 0 auto'
});

let styles = {
    main: {
        height: '10px',
        margin: '0 0 2px 0',
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
        let length = Math.max(3, Math.min(this.props.length, 100));
        let tooltip = (<Tooltip>{`${this.props.label}:00`}</Tooltip>);
        return (
            <OverlayTrigger placement="right" overlay={tooltip} animation={false}>
                <div style={styles.main}>
                    <div style={getStyles(length, this.props.length === 0)} />
                </div>
            </OverlayTrigger>
        );
    }
}
