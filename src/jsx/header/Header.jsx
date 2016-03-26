import React from 'react';
import _ from 'lodash';
import { Navbar } from 'react-bootstrap';

import { Header as Colors } from 'config/colors';

import Logo from './common/Logo.jsx';
import ReaderFilter from './reader/ReaderFilter.jsx';
import ReaderActions from './reader/ReaderActions.jsx';

const styles = {
    main: {
        border: `1px solid ${Colors.borderColor}`,
        fontWeight: 'bold'
    }
};

export default class Header extends React.Component {
    render() {
        return (
            <Navbar style={styles.main} fixedTop={true} fluid={true}>
                <Logo />
                <Navbar.Collapse>
                    <ReaderFilter />
                    <ReaderActions />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
