import React from 'react';
import Placeholder from 'config/Placeholder.jsx';
import Colors from 'config/Colors.jsx';

import RawStream from 'stream/RawStream.jsx';

import ContributorHeader from 'header/ContributorHeader.jsx';
import ContributorEditor from 'editor/ContributorEditor.jsx';

const styles = {
    main: {
        textColor: Colors.info.textColor,
        paddingTop: '50px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'hidden'
    },
    stream: {
        width: '100%'
    }
};

export default class ContributorView extends React.Component {
    render() {
        return (
            <div>
                <ContributorHeader />
                <div style={styles.main}>
                    <div style={styles.stream}>
                        <RawStream />
                    </div>
                    <ContributorEditor />
                </div>
            </div>
        );
    }
}
