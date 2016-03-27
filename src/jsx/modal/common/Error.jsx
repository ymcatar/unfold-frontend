import React from 'react';
import _ from 'lodash';

import { hideError } from 'redux/actions/modal';

import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

class Error extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
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
            show: state.modal.active === 'error',
            data: state.modal.data
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideError())
        };
    }
)(Error);
