import React from 'react';
import { connect } from 'react-redux';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import Colors from 'config/Colors.jsx';
import { selectFilter, reportFilter, scrollToTop } from '../actions/stream';

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
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(key) {
        switch (key) {
            case 'important':
                this.props.handleFilter('important');
                break;
            case 'reliable':
                this.props.handleFilter('reliable');
                break;
            case 'all':
                this.props.handleFilter('all');
                break;
        }
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
        return {
            filter: state.stream.filter
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
