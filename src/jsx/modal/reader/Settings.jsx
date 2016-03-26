import React from 'react';
import _ from 'lodash';

import { hideReaderSettings } from 'redux/actions/modal';

import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';

class Settings extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="select" label="Stream Language" placeholder="select">
                        <option value="eng">English</option>
                        <option value="cht">Traditional Chinese</option>
                    </Input>
                    <Input type="select" label="Timezone" placeholder="select">
                        <option value="current">My Timezone</option>
                        <option value="local">Event Location Timezone</option>
                    </Input>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Cancel</Button>
                    <Button onClick={this.handleSubmit} bsSize="small" bsStyle="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            show: state.modal.active === 'readerSettings'
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideReaderSettings())
        };
    }
)(Settings);
