import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import uuid from 'node-uuid';
import SweetScroll from 'sweet-scroll';

import {Modal} from 'react-bootstrap';

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

// http://stackoverflow.com/questions/10564680/get-div-position-top-in-javascript
const getOffset = el => {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
};

export default class Bar extends React.Component {
    constructor() {
        super();
        this.state = {scrolling: false};
        this.scrollTo = this.scrollTo.bind(this);
    }

    scrollTo() {
        if (this.props.length !== 0) {
            const scroll = new SweetScroll({offset: -15, duration: 0}, "#left");
            let name = 'update_' + this.props.time;

            let target = document.getElementsByClassName(name)[0];
            document.getElementById('stream').style.WebkitFilter = 'opacity(0.01)';
            scroll.toElement(target);

            this.setState({scrolling: true});

            let count = 0, prevValue;
            let align = setInterval(() => {
                scroll.toElement(target);
                if (getOffset(target).top == prevValue)
                    count++;
                else {
                    count = 0;
                    prevValue = getOffset(target).top;
                }
                if (count >= 2) {
                    this.setState({scrolling: false});
                    document.getElementById('stream').style.WebkitFilter = '';
                    clearInterval(align);
                }
            }, 1000);
        }
    }

    render() {
        let length = Math.max(3, Math.min(this.props.length, 100));
        let tooltip = (<Tooltip id={uuid.v1()}>{`${this.props.label}:00`}</Tooltip>);
        let disable = (this.props.length === 0);
        return (
            <div>
                <OverlayTrigger placement="bottom" overlay={tooltip} animation={false}>
                    <div style={getMainStyles(disable)} onClick={this.scrollTo}>
                        <div style={getStyles(length, disable, this.props.mobile)} />
                    </div>
                </OverlayTrigger>
                <Modal bsSize="small" show={this.state.scrolling}>
                    <Modal.Body>
                        <center>
                            <span className="fa fa-spin fa-spinner fa-2x" />
                        </center>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
