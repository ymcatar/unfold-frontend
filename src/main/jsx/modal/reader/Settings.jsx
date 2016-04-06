import React from 'react';
import _ from 'lodash';

import { hideReaderSettings, showSuccess } from 'redux/actions/modal';
import { storeReaderSettings } from 'redux/actions/ui';

import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';

const defaultConfig = {
    lang: 'eng'
};

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.elm = {};
        _.bindAll(this, ['handleSubmit']);
    }

    handleSubmit() {
        let data = {
            lang: this.elm.lang.getValue()
        };
        localStorage.readerSettings = JSON.stringify(data);
        this.props.storeReaderSettings(data);
        this.props.showSuccess('User settings updated successfully.'); // no ajax involved, assumed always success
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        ref={x => { this.elm.lang = x; }}
                        type="select"
                        label="Stream Language"
                        placeholder="select">
                        <option value="en">English</option>
                        <option value="zh-Hant">Traditional Chinese</option>
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
            handleHide: () => dispatch(hideReaderSettings()),
            showSuccess: msg => dispatch(showSuccess(msg)),
            storeReaderSettings: data => dispatch(storeReaderSettings(data))
        };
    }
)(Settings);
