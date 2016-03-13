import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from 'config/Colors.jsx';

import ReaderHeader from 'header/ReaderHeader.jsx';
import Stream from 'stream/Stream.jsx';
import Timeline from 'timeline/Timeline.jsx';
import ReaderInfo from 'info/ReaderInfo.jsx';

const styles = {
    main: {
        textColor: Colors.info.textColor,
        paddingTop: '50px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'hidden'
    }
};

export default class ReaderView extends React.Component {
    render() {
        return (
            <div>
                <ReaderHeader />
                <div style={styles.main}>
                    <Timeline type="stream" />
                    <MediaQuery minDeviceWidth={1224} minWidth={800}>
                        <ReaderInfo />
                    </MediaQuery>
                    <Stream />
                </div>
            </div>
        );
    }
}
