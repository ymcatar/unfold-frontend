import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import SweetScroll from 'sweet-scroll';

import Colors from 'config/Colors.jsx';

const styles = {
    main: {
        boxShadow: Colors.zDepth,
        backgroundColor: Colors.top.backgroundColor,
        color: Colors.top.color,
        borderColor: Colors.top.border,
        fontWeight: '600'
    },
    logo: {
        height: '36px'
    }
};

export default class ReaderTop extends React.Component {
    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(key) {
        switch(key) {
            case 1:
                const sweetScroll = new SweetScroll({offset: -10}, "#left");
                sweetScroll.to(0);
                break;
        }
    }

    render() {
        return (
            <Navbar style={styles.main} fixedTop={true} fluid={true}>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Header>
                        <Navbar.Text>
                            <img src="res/logo.png" style={styles.logo}/>
                        </Navbar.Text>
                    </Navbar.Header>
                    <Nav pullRight onSelect={this.handleSelect}>
                        <NavItem eventKey={1} href="#">
                            <i className="fa fa-chevron-circle-up" />
                            &nbsp;Top
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
