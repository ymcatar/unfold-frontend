import React from 'react';

import Login from './common/Login.jsx';
import Error from './common/Error.jsx';
import Success from './common/Success.jsx';
import Profile from './common/Profile.jsx';

export default class TranslatorModal extends React.Component {
    render() {
        return (
            <div>
                <Login />
                <Error />
                <Success />
                <Profile />
            </div>
        );
    }
}
