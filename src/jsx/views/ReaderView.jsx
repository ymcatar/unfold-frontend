import React from 'react';
import MediaQuery from 'react-responsive';

import Header from 'header/Header.jsx';
import Stream from 'stream/Stream.jsx';
import Timeline from 'timeline/Timeline.jsx';
import ReaderInfo from 'info/ReaderInfo.jsx';

import ReaderModal from 'modal/ReaderModal.jsx';

const styles = {
    main: {
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
                <Header type="reader" />
                <div style={styles.main}>
                    <Timeline type="stream" />

                    <MediaQuery minDeviceWidth={1224} minWidth={800}>
                        <ReaderInfo mobile={false}/>
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                        <ReaderInfo mobile={true}/>
                    </MediaQuery>

                    <Stream />
                    <ReaderModal />
                </div>
            </div>
        );
    }
}
