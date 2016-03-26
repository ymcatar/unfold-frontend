import React from 'react';

import Mail from './reader/Mail.jsx';
import Proof from './reader/Proof.jsx';

export default class ReaderModal extends React.Component {
    render() {
        return (
            <div>
                <Mail />
                <Proof />
            </div>
        );
    }
}
