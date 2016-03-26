import React from 'react';
import MediaQuery from 'react-responsive';

import Header from 'header/Header.jsx';
import Stream from 'stream/Stream.jsx';
import Timeline from 'timeline/Timeline.jsx';
import Sidebar from 'sidebar/Sidebar.jsx';

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
                    <MediaQuery minDeviceWidth={1224} minWidth={800}>
                       <Sidebar mobile={false} role="reader"/>
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                        <Sidebar mobile={true} role="reader"/>
                    </MediaQuery>
                    <Stream type="stream" />
                    <Timeline type="stream" />
                    <ReaderModal />
                </div>
            </div>
        );
    }
}
