import React from 'react';
import _ from 'lodash';

import { hideReaderProof } from 'redux/actions/modal';

import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';

class Proof extends React.Component {
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
                    <Modal.Title>Submit Proofs To Contributor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input disabled ref={x => {this.elm.title = x;}} type="Text" label="Subject" placeholder="(unavailable in demo)"/>
                    <Input disabled ref={x => {this.elm.target = x;}} type="select" label="Send to" multiple>
                        {this.props.contributor.map(o => (
                            <option value={o.id} key={o.id}>{o.name}</option>
                        ))}
                    </Input>
                    <Input disabled ref={x => {this.elm.content = x;}} type="textarea" style={{height: 300}} label="Mail content" placeholder="(unavailable in demo)" />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Cancel</Button>
                    <Button disabled onClick={this.handleSubmit} bsSize="small" bsStyle="primary">Send</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            contributor: state.event? state.event.roles.filter(i => i.type === "CONTRIBUTOR"): [],
            show: state.modal.active === 'readerProof'
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideReaderProof())
        };
    }
)(Proof);
