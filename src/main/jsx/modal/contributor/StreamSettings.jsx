import React from 'react';
import _ from 'lodash';

import { hideStreamSettings } from 'redux/actions/modal';
import { putEvent } from 'redux/actions/ajax';

import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';

class streamSettings extends React.Component {

    constructor(props) {
        super(props);
        this.elm = {};
        _.bindAll(this, ['handeleSubmit']);
    }

    handeleSubmit() {
        let data = {
            title: this.elm.title.getValue(),
            location: this.elm.location.getValue(),
            description: this.elm.description.getValue(),
            information: this.elm.information.getValue()
        };
        this.props.putEvent(this.props.token, this.props.eventId, data);
    }

    render() {
        if (!this.props.event)
            return null;

        let { title, location, description, information } = this.props.event;

        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Stream Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="lead">Event</p>

                    <Input
                        ref={x => {this.elm.title = x;}}
                        defaultValue={title}
                        type="text"
                        label="Title" />

                    <Input
                        ref={x => {this.elm.location = x;}}
                        defaultValue={location}
                        type="text"
                        label="Location" />

                    <Input
                        ref={x => {this.elm.description = x;}}
                        defaultValue={description}
                        maxLength={255}
                        placeholder="Description shall be shorter than 255 characters."
                        type="textarea"
                        label="Description" />

                    <Input
                        ref={x => {this.elm.information = x;}}
                        defaultValue={information}
                        type="textarea"
                        label="Information"
                        placeholder="Markdown is supported." />

                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Cancel</Button>
                    <Button bsSize="small" onClick={this.handeleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            show: state.modal.active === 'streamSettings',
            data: state.modal.data,
            event: state.event,
            eventId: state.ui.eventId,
            token: state.auth? state.auth.token: null
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideStreamSettings()),
            putEvent: (token, eventId, data) => dispatch(putEvent(token, eventId, data))
        };
    }
)(streamSettings);
