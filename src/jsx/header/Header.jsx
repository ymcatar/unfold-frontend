import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import * as StreamAction from 'redux/actions/stream';
import * as RawAction from 'redux/actions/raw';

import { toggleSidebar } from 'redux/actions/ui';
import { showReaderMail } from 'redux/actions/modal'; 

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';

import { Header as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        border: 'none',
        borderBottom: '1px solid #D3D2D3',
        fontWeight: 'bold'
    }
};

class Header extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['handleNavClick', 'handleFilter']);
    }

    handleFilter(key) {
        if (typeof key === 'string')
            this.props.handleFilter(key);
    }

    handleNavClick(key) {
        switch (key) {
            case 'sidebar':
                this.props.toggleSidebar(!this.props.sidebar);
                break;
            case 'top':
                this.props.handleBackToTop();
                break;
            case 'mail':
                this.props.showReaderMail();
                break;
        }
    }

    render() {

        const header = (
            <Navbar.Header>
                <Navbar.Brand>
                    <img src="res/logo.png"/>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        );

        const leftNav = (
            <Nav onSelect={this.handleFilter} activeKey={this.props.filter}>
                <NavItem eventKey="all" href="#">all</NavItem>
                <NavItem eventKey="important" href="#">important</NavItem>
                <NavItem eventKey="reliable" href="#">reliable</NavItem>
            </Nav>
        );

        const rightNav = (
            <Nav pullRight onSelect={this.handleNavClick}>
                <NavItem eventKey={'mail'} href="#">
                    <i className="material-icons">mail</i>
                </NavItem>
                <NavItem eventKey={'top'} href="#">
                    <i className="material-icons">vertical_align_top</i>
                </NavItem>
                <NavItem eventKey={'sidebar'} href="#">
                    {this.props.sidebar?
                        <i className="material-icons">info</i>:
                        <i className="material-icons">info_outline</i>}
                </NavItem>
            </Nav>
        );

        return (
            <Navbar style={styles.main} fixedTop={true} fluid={true}>
                {header}
                <Navbar.Collapse>
                    {leftNav}
                    {rightNav}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

let { string, func } = React.PropTypes;

Header.propTypes = {
    filter: string.isRequired,
    handleFilter: func.isRequired,
    handleBackToTop: func.isRequired,
    showReaderMail: func.isRequired
};

export default connect(
    function stateToProps(state, props) {
        switch (props.type) {
            case 'reader':
                return {
                    filter: state.stream.filter,
                    sidebar: state.ui.sidebar
                };
            case 'contributor':
                return {
                    filter: state.raw.filter,
                    sidebar: state.ui.sidebar
                };
            default:
                return {};
        }
    },
    function dispatchToProps(dispatch, props) {
        switch (props.type) {
            case 'reader':
                return {
                    toggleSidebar: val => dispatch(toggleSidebar(val)),
                    handleFilter: filter => dispatch(StreamAction.selectFilter(filter)),
                    handleBackToTop: () => dispatch(StreamAction.scrollToTop()),
                    showReaderMail: () => dispatch(showReaderMail())
                };
            case 'contributor':
                return {
                    toggleSidebar: val => dispatch(toggleSidebar(val)),
                    handleFilter: filter => dispatch(RawAction.selectFilter(filter)),
                    handleBackToTop: () => dispatch(RawAction.scrollToTop()),
                    showReaderMail: () => dispatch(RawAction.showReaderMail())
                };
            default:
                return {};
        }
}
)(Header);
