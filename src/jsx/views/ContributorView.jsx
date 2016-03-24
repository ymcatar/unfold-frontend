import React from 'react';
import MediaQuery from 'react-responsive';

import ReaderHeader from 'header/ReaderHeader.jsx';
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
                <ReaderHeader />
                <div style={styles.main}>
                    <Timeline type="raw" />

                    <MediaQuery minDeviceWidth={1224} minWidth={800}>
                        <ReaderInfo mobile={false}/>
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                        <ReaderInfo mobile={true}/>
                    </MediaQuery>

                    <Stream type="raw" />
                    <ReaderModal />
                </div>
            </div>
        );
    }
}
