import React from 'react';
import _ from 'lodash';

import { hideStreamSettings } from 'redux/actions/modal';

import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

class Success extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Stream Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.data}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Dismiss</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            show: state.modal.active === 'streamSettings',
            data: state.modal.data
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideStreamSettings())
        };
    }
)(Success);
