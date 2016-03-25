import React from 'react';
import uuid from 'node-uuid';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Bar as Colors } from 'config/Colors.jsx';

const getStyles = (length, disable) => ({
    backgroundColor: disable? Colors.disable: Colors.enable,
    opacity: Math.max(length*2/100, 0.1),
    width: `${length/100*70}px`,
    height: '25px',
    margin: '0 -1px 0 auto',
    borderRadius: '2px'
});

const getMainStyles = disable => ({
    height: '25px',
    margin: '0 0 5px 0',
    display: 'flex',
    cursor: disable? 'auto': 'pointer'
});

export default class Bar extends React.Component {
    render() {
        let length = Math.max(3, Math.min(this.props.length, 100));
        let tooltip = (<Tooltip id={uuid.v1()}>{`${this.props.label}:00`}</Tooltip>);
        let disable = (this.props.length === 0);
        return (
            <div onClick={this.props.onClick}>
                <OverlayTrigger placement={"right"} overlay={tooltip}>
                    <div style={getMainStyles(disable)}>
                        <div style={getStyles(length, disable)} />
                    </div>
                </OverlayTrigger>
            </div>
        );
    }
}

let { number, string } = React.PropTypes;

Bar.PropTypes = {
    length: number.isRequired,
    label: string.isRequired
};
