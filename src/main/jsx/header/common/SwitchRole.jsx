import React from 'react';
import _ from 'lodash';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { connect } from 'react-redux';

class User extends React.Component {

    constructor(props) {
        super(props);
        _.bindAll(this, ['handleNavClick']);
    }

    handleNavClick(key) {
        switch (key) {
            case 'reader':
                window.open(`../reader/${this.props.eventId}`, '_blank');
                break;
            case 'contributor':
                window.open(`../contributor/${this.props.eventId}`, '_blank');
                break;
            case 'translator':
                window.open(`../translator/${this.props.eventId}`, '_blank');
                break;
        }
    }

    render() {
        if (!this.props.isContributor && !this.props.isTranslator && !this.props.isOwner)
            return null;

        let reader = this.props.type !== 'reader'? (
            <MenuItem onClick={() => {this.handleNavClick('reader');}}>
                <i className="zmdi zmdi-eye" />
                &nbsp;Reader View
            </MenuItem>
        ): null;

        let contributor = this.props.type !== 'contributor' && this.props.isContributor? (
            <MenuItem onClick={() => {this.handleNavClick('contributor');}}>
                <i className="zmdi zmdi-edit" />
                &nbsp;Contributor View
            </MenuItem>
        ): null;

        let translator = this.props.type !== 'translator' && this.props.isTranslator? (
            <MenuItem onClick={() => {this.handleNavClick('translator');}}>
                <i className="zmdi zmdi-translate" />
                &nbsp;Translator View
            </MenuItem>
        ): null;

        return (
            <NavDropdown
                id="switch_role"
                title={<i className="zmdi zmdi-accounts-list" />}>
                {reader}
                {contributor}
                {translator}
                </NavDropdown>
            );
    }
}

export default connect(
    function stateToProps(state, props) {

        let userRoleList = state.event && state.user && state.event.roles?
            state.event.roles
                .filter(item => item.user.id == state.user.id)
                .map(item => item.type): false;

        let isOwner, isContributor, isTranslator;

        if (userRoleList) {
            isOwner = userRoleList.indexOf('OWNER') >= 0;
            isContributor = isOwner || userRoleList.indexOf('CONTRIBUTOR') >= 0;
            isTranslator = isOwner || userRoleList.indexOf('TRANSLATOR') >= 0;
        }

        return { isOwner, isContributor, isTranslator, eventId: state.ui.eventId };
    },
    function dispatchToProps(dispatch, props) {
        return {};
    }
)(User);
