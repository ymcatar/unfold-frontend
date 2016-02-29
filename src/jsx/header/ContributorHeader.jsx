import React from 'react';
import { connect } from 'react-redux';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import Colors from 'config/Colors.jsx';

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
    }

    render() {
        return (
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
                    <Nav>
                        <NavItem>
                        </NavItem>
                    </Nav>
                    <Nav pullRight onSelect={this.props.handleBackToTop}>
                        <NavItem eventKey={'top'} href="#">
                            <i className="fa fa-chevron-circle-up" />
                            &nbsp;Top
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {};
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(ContributorHeader);
