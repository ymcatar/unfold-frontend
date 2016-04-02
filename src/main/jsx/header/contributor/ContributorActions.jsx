import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { toggleSidebar } from 'redux/actions/ui';
import { showReaderMail, showStreamSettings } from 'redux/actions/modal'; 
import { scrollToTop } from 'redux/actions/stream';

import User from '../common/User.jsx';
import Top from '../common/Top.jsx';

class ContributorActions extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['handleNavClick']);
    }

    handleNavClick(key) {
        switch (key) {
            case 'settings':
                this.props.showStreamSettings();
                break;
            case 'sidebar':
                this.props.toggleSidebar(!this.props.sidebar);
                break;
            case 'mail':
                this.props.showReaderMail();
                break;
            case 'reader':
                window.open(`../reader/${this.props.eventId}`, '_blank');
                break;
        }
    }

    render() {
        return (
            <Nav pullRight onSelect={this.handleNavClick}>
                <Top type="contributor" />
                <NavItem eventKey={'reader'} href="#">
                    <i className="material-icons">public</i>
                    &nbsp;READER
                </NavItem>
                <NavItem eventKey={'settings'} href="#">
                    <i className="material-icons">settings</i>
                </NavItem>
                <NavItem eventKey={'mail'} href="#">
                    <i className="material-icons">mail</i>
                </NavItem>
                <NavItem eventKey={'sidebar'} href="#">
                    {this.props.sidebar?
                        <i className="material-icons">info</i>:
                        <i className="material-icons">info_outline</i>}
                </NavItem>
                <User />
            </Nav>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            sidebar: state.ui.sidebar,
            eventId: state.ui.eventId
        };
    },
    function dispatchToProps(dispatch, props) {
        return ({
            toggleSidebar: val => dispatch(toggleSidebar(val)),
            showReaderMail: () => dispatch(showReaderMail()),
            showStreamSettings: () => dispatch(showStreamSettings()),
        });
    }
)(ContributorActions);
