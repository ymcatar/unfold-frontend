import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { toggleSidebar } from 'redux/actions/ui';
import { showReaderMail, showReaderSettings } from 'redux/actions/modal'; 

import User from '../common/User.jsx';
import Top from '../common/Top.jsx';

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
            case 'mail':
                this.props.showReaderMail();
                break;
            case 'contributor':
                window.open(`../contributor/${this.props.eventId}`, '_blank');
                break;
        }
    }

    render() {

        let contributor = this.props.isContributor? (
            <NavItem eventKey={'contributor'} href="#">
                <i className="material-icons">public</i>
                &nbsp;CONTRIBUTOR
            </NavItem>
        ): null;

        return (
            <Nav pullRight onSelect={this.handleNavClick}>
                <Top />
                {contributor}
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

        let isContributor = state.event && state.user && state.event.roles?
            state.event.roles.filter(item => (
                item.userId = state.user.id && (item.type === 'CONTRIBUTOR' || item.type === 'OWNER')
        ))[0]: false;

        return {
            sidebar: state.ui.sidebar,
            eventId: state.ui.eventId,
            isContributor
        };
    },
    function dispatchToProps(dispatch, props) {
        return ({
            toggleSidebar: val => dispatch(toggleSidebar(val)),
            showReaderMail: () => dispatch(showReaderMail()),
            showSettings: () => dispatch(showReaderSettings()),
        });
    }
)(ReaderActions);
