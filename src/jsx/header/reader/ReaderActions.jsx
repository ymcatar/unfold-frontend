import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { toggleSidebar } from 'redux/actions/ui';
import { showReaderMail, showReaderSettings, showLogin } from 'redux/actions/modal'; 
import { scrollToTop } from 'redux/actions/stream';

class ReaderActions extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['handleNavClick']);
    }

    handleNavClick(key) {
        switch (key) {
            case 'settings':
                this.props.showSettings();
                break;
            case 'sidebar':
                this.props.toggleSidebar(!this.props.sidebar);
                break;
            case 'top':
                this.props.handleBackToTop();
                break;
            case 'mail':
                this.props.showReaderMail();
                break;
            case 'user':
                if (this.props.user)
                    this.props.showLogout();
                else
                    this.props.showLogin();
                break;
        }
    }

    render() {
        return (
            <Nav pullRight onSelect={this.handleNavClick}>
                <NavItem eventKey={'settings'} href="#">
                    <i className="material-icons">settings</i>
                    &nbsp;SETTINGS
                </NavItem>
                <NavItem eventKey={'mail'} href="#">
                    <i className="material-icons">mail</i>
                    &nbsp;MAIL
                </NavItem>
                <NavItem eventKey={'top'} href="#">
                    <i className="material-icons">vertical_align_top</i>
                    &nbsp;TOP
                </NavItem>
                <NavItem eventKey={'sidebar'} href="#">
                    {this.props.sidebar?
                        <i className="material-icons">info</i>:
                        <i className="material-icons">info_outline</i>}
                    &nbsp;INFO
                </NavItem>
                <NavItem eventKey={'user'} href="#">
                    <i className="material-icons">people</i>
                    &nbsp;LOGIN
                </NavItem>
            </Nav>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            sidebar: state.ui.sidebar
        };
    },
    function dispatchToProps(dispatch, props) {
        return ({
            toggleSidebar: val => dispatch(toggleSidebar(val)),
            handleBackToTop: () => dispatch(scrollToTop()),
            showReaderMail: () => dispatch(showReaderMail()),
            showSettings: () => dispatch(showReaderSettings()),
            showLogin: () => dispatch(showLogin())
        });
    }
)(ReaderActions);
