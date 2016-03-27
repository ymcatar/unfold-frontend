import React from 'react';

import Mail from './reader/Mail.jsx';
import Proof from './reader/Proof.jsx';
import Settings from './reader/Settings.jsx';

import Login from './common/Login.jsx';
import Error from './common/Error.jsx';
import Success from './common/Success.jsx';
import Profile from './common/Profile.jsx';

export default class ReaderModal extends React.Component {
    render() {
        return (
            <div>
                <Mail />
                <Proof />
                <Settings />

                <Login />
                <Error />
                <Success />
                <Profile />
            </div>
        );
    }
}
