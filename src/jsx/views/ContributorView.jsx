import React from 'react';
import Placeholder from 'config/Placeholder.jsx';
import Colors from 'config/Colors.jsx';

import Stream from 'stream/Stream.jsx';

import Timeline from 'timeline/Timeline.jsx';

import Header from 'header/Header.jsx';

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
    editor: {
        backgroundColor: Colors.stream.backgroundColor,
        width: '600px',
        padding: '20px',
        paddingTop: '70px'
    },
    stream: {
        backgroundColor: Colors.stream.backgroundColor,
        height: '100vh',
        width: '100%',
        paddingBottom: '50px'
    },
    timeline: {
        backgroundColor: Colors.timeline.backgroundColor,
        width: '70px',
        minWidth: '70px',
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden'
    }
};

export default class ContributorView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div style={styles.main}>
                    <div style={styles.editor}>
                        <ContributorEditor />
                    </div>

                    <div style={styles.stream}>
                        <Stream />
                    </div>

                    <div style={styles.timeline}>
                        <Timeline />
                    </div>
                </div>
            </div>
        );
    }
}
