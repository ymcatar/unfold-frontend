import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';
import { selectFilter, reportFilter, scrollToTop } from 'redux/actions/stream';
import { showReaderMail } from 'redux/actions/modal'; 

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { Header as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        fontWeight: 'bolder',
        borderBottom: `2px solid ${Colors.borderColor}`
    }
};

class ReaderHeader extends React.Component {
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

export default connect(
    function stateToProps(state) {
        return {
            filter: state.stream.filter,
            contributor: state.event.contributors
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleFilter: filter => dispatch(selectFilter(filter)),
            handleBackToTop: () => dispatch(scrollToTop()),
            showReaderMail: () => dispatch(showReaderMail())
        };
    }
)(ReaderHeader);
