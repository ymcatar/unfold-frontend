import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from 'config/Colors.jsx';

import RawStream from 'stream/RawStream.jsx';

import Timeline from 'timeline/Timeline.jsx';

import ContributorInfo from 'info/ContributorInfo.jsx';
import ContributorHeader from 'header/ContributorHeader.jsx';
import Editor from 'editor/Editor.jsx';

const styles = {
    main: {
        textColor: Colors.info.textColor,
        marginTop: '50px',
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
                    <Timeline type="raw" />
                    <div style={styles.stream}><RawStream /></div>
                    <Editor type="raw" />
                </div>
            </div>
        );
    }
}
