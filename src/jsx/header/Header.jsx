import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import * as StreamAction from 'redux/actions/stream';
import * as RawAction from 'redux/actions/raw';

import { showReaderMail } from 'redux/actions/modal'; 

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { Header as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        fontWeight: 'bolder',
        borderBottom: `2px solid ${Colors.borderColor}`
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
                <Navbar.Text>
                    <img src="res/logo.png" height={40}/>
                </Navbar.Text>
            </Navbar.Header>
        );

        const leftNav = (
            <Nav onSelect={this.handleFilter} activeKey={this.props.filter}>
                <NavItem eventKey="all" href="#">All</NavItem>
                <NavItem eventKey="important" href="#">Important</NavItem>
                <NavItem eventKey="reliable" href="#">Reliable</NavItem>
            </Nav>
        );

        const rightNav = (
            <Nav pullRight onSelect={this.handleNavClick}>
                <NavItem eventKey={'mail'} href="#">
                    <i className="material-icons">mail</i>
                    &nbsp;Mail
                </NavItem>
                <NavItem eventKey={'top'} href="#">
                    <i className="material-icons">vertical_align_top</i>
                    &nbsp;Top
                </NavItem>
            </Nav>
        );

        return (
            <Navbar style={styles.main} fixedTop={true} fluid={true}>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    {header}
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
                return { filter: state.stream.filter };
            case 'contributor':
                return { filter: state.raw.filter };
            default:
                return {};
        }
    },
    function dispatchToProps(dispatch, props) {
        switch (props.type) {
            case 'reader':
                return {
                    handleFilter: filter => dispatch(StreamAction.selectFilter(filter)),
                    handleBackToTop: () => dispatch(StreamAction.scrollToTop()),
                    showReaderMail: () => dispatch(StreamAction.showReaderMail())
                };
            case 'contributor':
                return {
                    handleFilter: filter => dispatch(RawAction.selectFilter(filter)),
                    handleBackToTop: () => dispatch(RawAction.scrollToTop()),
                    showReaderMail: () => dispatch(RawAction.showReaderMail())
                };
            default:
                return {};
        }
}
)(Header);
