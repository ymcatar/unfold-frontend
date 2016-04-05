import React from 'react';
import _ from 'lodash';
import { Navbar } from 'react-bootstrap';

import { Header as Colors } from 'config/colors';

import Logo from './common/Logo.jsx';

import ReaderFilter from './reader/ReaderFilter.jsx';
import ReaderActions from './reader/ReaderActions.jsx';

import ContributorFilter from './contributor/ContributorFilter.jsx';
import ContributorActions from './contributor/ContributorActions.jsx';

const styles = {
    main: {
        border: `1px solid ${Colors.borderColor}`,
        fontWeight: 'bold'
    }
};

export default class Header extends React.Component {
    render() {
        let filter, actions;
        switch (this.props.role) {
            case "reader":
                filter = <ReaderFilter />;
                actions = <ReaderActions />;
                break;
            case "contributor":
                filter = <ContributorFilter />;
                actions = <ContributorActions />;
                break;
            case "translator":
                filter = null;
                actions = null;
                break;
        }

        return (
            <Navbar style={styles.main} fixedTop={true} fluid={true}>
                <Logo />
                <Navbar.Collapse>
                    {filter}
                    {actions}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
