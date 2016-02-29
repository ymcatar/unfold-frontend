import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Modal, Button, Input } from 'react-bootstrap';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';
import { selectFilter, reportFilter, scrollToTop } from '../actions/stream';

const styles = {
    main: {
        boxShadow: Colors.zDepth,
        backgroundColor: Colors.header.backgroundColor,
        color: Colors.header.color,
        borderColor: Colors.header.border,
        fontWeight: '500'
    },
    logo: {
        height: '36px'
    }
};

class ReaderHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.elm = {};
        _.bindAll(this, [
            'handleNavClick',
            'handleFilter',
            'hideModal',
            'showModal',
            'handleSubmit'
        ]);
    }

    handleFilter(key) {
        this.props.handleFilter(key);
    }

    handleNavClick(key) {
        switch (key) {
            case 'top':
                this.props.handleBackToTop();
                break;
            case 'mail':
                this.showModal();
                break;
        }
    }

    hideModal() {
        this.setState({showModal: false});
    }

    showModal() {
        this.setState({showModal: true});
    }

    handleSubmit() {
        this.hideModal();
        let output = {
            target: this.elm.target.getValue(),
            content: this.elm.content.getValue()
        };
        console.log(output);
    }

    render() {
        return (
            <div>
                <Navbar style={styles.main} fixedTop={true} fluid={true}>
                    <Navbar.Toggle>
                        <i className="fa fa-bars" />
                        &nbsp;Toggle
                    </Navbar.Toggle>
                    <Navbar.Collapse>
                        <Navbar.Header>
                            <Navbar.Text>
                                <img src="res/logo.png" style={styles.logo}/>
                            </Navbar.Text>
                        </Navbar.Header>
                        <Nav onSelect={this.handleFilter} activeKey={this.props.filter}>
                            <NavItem eventKey={'all'} href="#">
                                All
                            </NavItem>
                            <NavItem eventKey={'important'} href="#">
                                Important
                            </NavItem>
                            <NavItem eventKey={'reliable'} href="#">
                                Reliable
                            </NavItem>
                        </Nav>
                        <Nav pullRight onSelect={this.handleNavClick}>
                            <NavItem eventKey={'mail'} href="#">
                                <i className="fa fa-envelope" />
                            </NavItem>
                            <NavItem eventKey={'top'} href="#">
                                <i className="fa fa-chevron-circle-up" />
                                &nbsp;Top
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Modal
                    show={this.state.showModal}
                    onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send Message To Contributor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            ref={x => {this.elm.target = x;}}
                            type="select"
                            label="Send to"
                            multiple>
                            {
                                this.props.contributor.map(o => (
                                    <option value={o.id}>
                                        {o.name}
                                    </option>
                                ))
                            }
                        </Input>
                        <Input
                            ref={x => {this.elm.content = x;}}
                            type="textarea"
                            style={{height: 300}}
                            label="Mail content" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Cancel</Button>
                        <Button
                            onClick={this.handleSubmit}
                            bsStyle="primary">
                            Send
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            filter: state.stream.filter,
            contributor: state.event.contributors
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleFilter(filter) {
                dispatch(selectFilter(filter));
            },

            handleBackToTop() {
                dispatch(scrollToTop());
            }
        };
    }
)(ReaderHeader);
