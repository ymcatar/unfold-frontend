import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import SweetScroll from 'sweet-scroll';

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

export default class ReaderHeader extends React.Component {
    constructor() {
        super();
        this.handleBackToTop = this.handleBackToTop.bind(this);
    }

    handleBackToTop() {
        const sweetScroll = new SweetScroll({offset: -10}, "#left");
        sweetScroll.to(0);
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
                    </Nav>
                    <Nav pullRight onSelect={this.handleBackToTop}>
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
