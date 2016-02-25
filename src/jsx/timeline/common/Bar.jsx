import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import uuid from 'node-uuid';

import Colors from 'config/Colors.jsx';

const getStyles = (length, disable, mobile) => ({
    backgroundColor: disable? Colors.timeline.disable: Colors.timeline.enable,
    width: `${length/100*70}px`,
    height: mobile? '30px': '10px',
    margin: '0 2px 0 auto'
});

const getMainStyles = disable => ({
    height: '10px',
    margin: '0 0 2px 0',
    display: 'flex',
    cursor: disable? 'auto': 'pointer'
});

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let length = Math.max(3, Math.min(this.props.length, 100));
        let tooltip = (<Tooltip id={uuid.v1()}>{`${this.props.label}:00`}</Tooltip>);
        let disable = (this.props.length === 0);
        return (
            <div onClick={this.props.onClick}>
                <OverlayTrigger placement="bottom" overlay={tooltip} animation={false}>
                    <div style={getMainStyles(disable)}>
                        <div style={getStyles(length, disable, this.props.mobile)} />
                    </div>
                </OverlayTrigger>
            </div>
        );
    }
}
