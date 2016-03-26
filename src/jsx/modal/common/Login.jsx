import React from 'react';
import _ from 'lodash';

import { hideLogin } from 'redux/actions/modal';
import { postLogin } from 'redux/actions/ajax';

import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.elm = {};
        _.bindAll(this, ['handleSubmit']);
    }

    handleSubmit() {
        let username = this.elm.username.getValue();
        let password = this.elm.password.getValue();
        this.props.login(username, password);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input ref={x => {this.elm.username = x;}} label="Username" type="text" />
                    <Input ref={x => {this.elm.password = x;}} label="Password" type="password"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Cancel</Button>
                    <Button onClick={this.handleSubmit} bsSize="small" bsStyle="primary">Login</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            show: state.modal.active === 'login'
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideLogin()),
            login: (username, password) => dispatch(postLogin(username, password))
        };
    }
)(Settings);
