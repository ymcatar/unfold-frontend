import React from 'react';

import Mail from './reader/Mail.jsx';

import StreamSettings from './contributor/StreamSettings.jsx';
import ScraperSettings from './contributor/ScraperSettings.jsx';

import Login from './common/Login.jsx';
import Error from './common/Error.jsx';
import Success from './common/Success.jsx';
import Profile from './common/Profile.jsx';

export default class ContributorModal extends React.Component {
    render() {
        return (
            <div>
                <Mail />
                <StreamSettings />
                <ScraperSettings />

                <Login />
                <Error />
                <Success />
                <Profile />
            </div>
        );
    }
}
