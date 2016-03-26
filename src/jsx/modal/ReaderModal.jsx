import React from 'react';

import Mail from './reader/Mail.jsx';
import Proof from './reader/Proof.jsx';
import Settings from './reader/Settings.jsx';

import Login from './common/Login.jsx';

export default class ReaderModal extends React.Component {
    render() {
        return (
            <div>
                <Mail />
                <Proof />
                <Settings />

                <Login />
            </div>
        );
    }
}
