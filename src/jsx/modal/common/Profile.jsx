import React from 'react';
import _ from 'lodash';

import { hideProfile } from 'redux/actions/modal';
import { putUser } from 'redux/actions/ajax';

import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.elm = {};
        _.bindAll(this, ['handleSubmit']);
    }

    handleSubmit() {
        let name = this.elm.name.getValue();
        let description = this.elm.description.getValue();
        this.props.putUser(this.props.user.id, name, { description });
    }

    render() {
        let name = this.props.user? this.props.user.name: '';
        let description = this.props.user && this.props.user.profile? this.props.user.profile.description: '';
        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        ref={x => {this.elm.name = x;}}
                        defaultValue={name}
                        label="Display Name"
                        type="text" />
                    <Input
                        ref={x => {this.elm.description = x;}}
                        defaultValue={description}
                        label="Description"
                        type="text"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Cancel</Button>
                    <Button onClick={this.handleSubmit} bsSize="small" bsStyle="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            show: state.modal.active === 'profile',
            user: state.user
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideProfile()),
            putUser: (id, name, profile) => dispatch(putUser(id, name, profile))
        };
    }
)(Login);
