import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';
import { selectFilter, reportFilter, scrollToTop } from 'actions/stream';

import Mail from 'modal/reader/Mail.jsx';

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
        this.elm = {};
        this.state = {showModal: false};
        _.bindAll(this, [
            'handleNavClick',
            'handleFilter'
        ]);
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
                this.setState({showModal: true});
                break;
        }
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
                            <NavItem eventKey="all" href="#">
                                All
                            </NavItem>
                            <NavItem eventKey="important" href="#">
                                Important
                            </NavItem>
                            <NavItem eventKey="reliable" href="#">
                                Reliable
                            </NavItem>
                            <NavDropdown
                                eventKey='customTag'
                                title="Other"
                                id="customTag"
                                onSelect = {(a, key) => { this.handleFilter(key); }} >
                                <MenuItem eventKey="facebook">
                                    #facebook
                                </MenuItem>
                                <MenuItem eventKey="facebook">
                                    #twitter
                                </MenuItem>
                                <MenuItem eventKey="Central">
                                    #Central
                                </MenuItem>
                                <MenuItem eventKey="TsimShaTsui">
                                    #TsimShaTsui
                                </MenuItem>
                                <MenuItem eventKey="Mongkok">
                                    #Mongkok
                                </MenuItem>
                                <MenuItem eventKey="CausewayBay">
                                    #CausewayBay
                                </MenuItem>
                            </NavDropdown>
                        </Nav>

                        <Nav pullRight onSelect={this.handleNavClick}>
                            <NavItem eventKey={'mail'} href="#">
                                <i className="fa fa-envelope" />
                                &nbsp;Mail
                            </NavItem>
                            <NavItem eventKey={'top'} href="#">
                                <i className="fa fa-chevron-circle-up" />
                                &nbsp;Top
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Mail
                    show={this.state.showModal}
                    handleHide={() => {this.setState({showModal: false}); }} />
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
