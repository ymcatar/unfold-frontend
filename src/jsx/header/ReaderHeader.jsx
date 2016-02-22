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
        this.handleFilter = this.handleFilter.bind(this);
        this.handleBackToTop = this.handleBackToTop.bind(this);
    }

    handleFilter(key) {
        switch(key) {
            case 'important':
                this.props.handleFilter.call(this, 'important');
                break;
            case 'reliable':
                this.props.handleFilter.call(this, 'reliable');
                break;
            case 'all':
                this.props.handleFilter.call(this, 'all');
                break;
        }
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
                    <Nav onSelect={this.handleFilter} activeKey={this.props.filter}>
                        <NavItem eventKey={'all'} href="#">
                            All
                        </NavItem>
                        <NavItem eventKey={'important'} href="#">
                            Important
                        </NavItem>
                        <NavItem eventKey={'reliable'} href="#">
                            Reliable
                        </NavItem>
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
