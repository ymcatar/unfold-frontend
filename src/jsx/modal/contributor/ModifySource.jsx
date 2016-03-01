import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input } from 'react-bootstrap';
import _ from 'lodash';

export default class ModifySource extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Source</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleHide}>Cancel</Button>
                    <Button
                        bsStyle="primary">
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
