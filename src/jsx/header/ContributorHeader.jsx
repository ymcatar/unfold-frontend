import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Colors from 'config/Colors.jsx';
import { selectFilter, reportFilter, scrollToTop } from 'actions/raw';

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

class ContributorHeader extends React.Component {
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
                            <NavItem eventKey="all" href="#">All</NavItem>
                            <NavItem eventKey="facebook" href="#">facebook</NavItem>
                            <NavItem eventKey="twitter" href="#">twitter</NavItem>
                            <NavItem eventKey="imgur" href="#">imgur</NavItem>
                            <NavItem eventKey="news" href="#">news</NavItem>
                        </Nav>

                        <Nav pullRight onSelect={this.handleNavClick}>
                            <NavItem eventKey={'top'} href="#">
                                <i className="fa fa-chevron-circle-up" />
                                &nbsp;Top
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {filter: state.raw.filter};
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
)(ContributorHeader);
