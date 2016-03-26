import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { toggleSidebar } from 'redux/actions/ui';
import { showReaderMail } from 'redux/actions/modal'; 
import { scrollToTop } from 'redux/actions/stream';

class ReaderActions extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['handleNavClick']);
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
        return (
            <Nav pullRight onSelect={this.handleNavClick}>
                <NavItem eventKey={'mail'} href="#">
                    <i className="material-icons">mail</i>
                    &nbsp;MAIL
                </NavItem>
                <NavItem eventKey={'top'} href="#">
                    <i className="material-icons">vertical_align_top</i>
                    &nbsp;TOP
                </NavItem>
                <NavItem eventKey={'sidebar'} href="#">
                    {this.props.sidebar?
                        <i className="material-icons">info</i>:
                        <i className="material-icons">info_outline</i>}
                    &nbsp;INFO
                </NavItem>
            </Nav>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            sidebar: state.ui.sidebar
        };
    },
    function dispatchToProps(dispatch, props) {
        return ({
            toggleSidebar: val => dispatch(toggleSidebar(val)),
            handleBackToTop: () => dispatch(scrollToTop()),
            showReaderMail: () => dispatch(showReaderMail())
        });
    }
)(ReaderActions);
