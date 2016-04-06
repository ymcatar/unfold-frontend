import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { toggleSidebar } from 'redux/actions/ui';
import { showReaderMail, showStreamSettings, showScraperSettings } from 'redux/actions/modal'; 
import { scrollToTop } from 'redux/actions/stream';

import User from '../common/User.jsx';
import Top from '../common/Top.jsx';
import SwitchRole from '../common/SwitchRole.jsx';

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
            // case 'mail':
            //     this.props.showReaderMail();
            //     break;
            case 'scraper':
                this.props.showScraperSettings();
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
                <SwitchRole type="contributor" />
                {/*
                <NavItem eventKey={'mail'} href="#">
                    <i className="zmdi zmdi-email zmdi-hc-fw" />
                </NavItem>
                */}
                <NavItem eventKey={'settings'} href="#">
                    <i className="zmdi zmdi-settings zmdi-hc-fw" />
                </NavItem>
                <NavItem eventKey={'scraper'} href="#">
                    <i className="zmdi zmdi-collection-plus zmdi-hc-fw" />
                </NavItem>
                <NavItem eventKey={'sidebar'} href="#">
                    {this.props.sidebar?
                        <i className="zmdi zmdi-info zmdi-hc-fw" />:
                        <i className="zmdi zmdi-info-outline zmdi-hc-fw" />
                    }
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
            //showReaderMail: () => dispatch(showReaderMail()),
            showStreamSettings: () => dispatch(showStreamSettings()),
            showScraperSettings: () => dispatch(showScraperSettings())
        });
    }
)(ContributorActions);
