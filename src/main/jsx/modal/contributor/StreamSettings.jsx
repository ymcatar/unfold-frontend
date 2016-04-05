import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import { hideStreamSettings } from 'redux/actions/modal';
import { putEvent } from 'redux/actions/ajax';

import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';

class streamSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.elm = {};
        _.bindAll(this, ['handleSubmit', 'handlePicker']);
    }

    handleSubmit() {
        let data = {
            title: this.elm.title.getValue(),
            location: this.elm.location.getValue(),
            description: this.elm.description.getValue(),
            information: this.elm.information.getValue()
        };

        if (this.state.startedAt)
            data.startedAt = this.state.startedAt.format();

        if (this.state.endedAt)
            data.endedAt = this.state.endedAt.format();

        this.props.putEvent(this.props.token, this.props.eventId, data);
    }

    handlePicker(e, picker) {
        this.setState({
            startedAt: picker.startDate,
            endedAt: picker.endDate
        });
    }

    render() {
        if (!this.props.event)
            return null;

        let { title, location, description, information, startedAt, endedAt } = this.props.event;

        startedAt = startedAt || new Date();
        endedAt = endedAt || new Date();

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
                        ref={x => {this.elm.description = x;}}
                        defaultValue={description}
                        maxLength={255}
                        placeholder="Description shall be shorter than 255 characters."
                        type="textarea"
                        label="Description" />

                    <hr />

                    <label>Date</label>
                    <DateRangePicker
                        onApply={this.handlePicker}
                        startDate={moment(startedAt)}
                        endDate={moment(endedAt)}>
                        <Button>Open</Button>
                    </DateRangePicker>

                    <hr />

                    <Input
                        type="text"
                        ref={x => {this.elm.location = x;}}
                        defaultValue={location}
                        label="Location" />

                    <Input
                        type="textarea"
                        ref={x => {this.elm.information = x;}}
                        defaultValue={information|| 'To be added.'}
                        placeholder="Markdown is supported."
                        label="Information" />

                    <hr />

                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Cancel</Button>
                    <Button bsStyle="primary" bsSize="small" onClick={this.handleSubmit}>Submit</Button>
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
