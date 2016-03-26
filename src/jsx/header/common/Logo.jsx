import React from 'react';
import { Navbar } from 'react-bootstrap';

export default class Logo extends React.Component {
    render() {
        return (
            <Navbar.Header>
                <Navbar.Brand>
                    <img src="res/logo.png"/>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        );
    }
}
