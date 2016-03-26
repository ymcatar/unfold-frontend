import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';
import { hideReaderMail } from 'redux/actions/modal';

import { Modal, Button, Input } from 'react-bootstrap';

class Mail extends React.Component {
    constructor(props) {
        super(props);
        this.elm = {};
        _.bindAll(this, ['handleSubmit']);
    }

    handleSubmit() {
        this.props.handleHide();
        let output = {
            title: this.elm.title.getValue(),
            target: this.elm.target.getValue(),
            content: this.elm.content.getValue()
        };
        console.log(output);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Message To Contributor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input ref={x => {this.elm.title = x;}} type="Text" label="Subject" />
                    <Input ref={x => {this.elm.target = x;}} type="select" label="Send to" multiple>
                        {this.props.contributor.map(o => (
                            <option value={o.id} key={o.id}>{o.name}</option>
                        ))}
                    </Input>
                    <Input ref={x => {this.elm.content = x;}} type="textarea" style={{height: 300}} label="Mail content" />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Cancel</Button>
                    <Button onClick={this.handleSubmit} bsSize="small" bsStyle="primary">Send</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            contributor: state.event.roles.filter(i => i.type === "CONTRIBUTOR"),
            show: state.modal.active == "readerMail"
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideReaderMail())
        };
    }
)(Mail);
