import React from 'react';
import _ from 'lodash';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { connect } from 'react-redux';
import { showLogin } from 'redux/actions/modal';
import { getUser, loadLogin, loadLogout } from 'redux/actions/ajax';

class User extends React.Component {

    constructor(props) {
        super(props);
        _.bindAll(this, ['handleClick', 'handleNavClick']);
    }

    componentWillMount() {
        let { token, exp, user } = localStorage;
        if (token && exp && user) {
            this.props.loadLogin(token, exp);
            this.props.getUser(user);
        }
    }

    handleClick() {
        this.props.showLogin();
    }

    handleNavClick(key) {
        switch (key) {
            case 'profile':
                this.props.showProfileChange();
                break;
            case 'logout':
                this.props.loadLogout();
                break;
        }
    }

    render() {
        if (!this.props.user || !this.props.auth)
            return (
                <NavItem href="#" onClick={this.handleClick}>
                    <i className="material-icons">people</i>
                    &nbsp;LOGIN
                </NavItem>
            );
        else
            return (
                <NavDropdown
                    id="profile"

                    title={<i className="material-icons">people</i>} >
                    <MenuItem disabled>Signed in as {this.props.user.name}</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={() => {this.handleNavClick('profile');}}>Change Profile</MenuItem>
                    <MenuItem onClick={() => {this.handleNavClick('logout');}}>Logout</MenuItem>
                </NavDropdown>
            );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            auth: state.auth,
            user: state.user
        };
    },
    function dispatchToProps(dispatch, props) {
        return {
            loadLogin: () => dispatch(loadLogin()),
            loadLogout: () => dispatch(loadLogout()),
            showLogin: () => dispatch(showLogin()),
            getUser: name => dispatch(getUser(name))
        };
    }
)(User);
