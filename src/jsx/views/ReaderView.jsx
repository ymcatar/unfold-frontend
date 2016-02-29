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
        const generateBody = (stream, timeline, info, noAvatar) => (
            <div>
                <ReaderHeader />
                <div style={styles.main}>
                    {info? (<ReaderInfo />): null}
                    {timeline? (<Timeline />): null}
                    {stream? (<Stream small={noAvatar} />): null}
                </div>
            </div>
        );
        return (
            <div>
                <MediaQuery minDeviceWidth={1224}>
                    <MediaQuery minWidth={1000}>
                        {generateBody(true, true, true, true)}
                    </MediaQuery>
                    <MediaQuery minWidth={800} maxWidth={1000}>
                        {generateBody(true, true, true, false)}
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                        {generateBody(true, true, false, false)}
                    </MediaQuery>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    {generateBody(true, false, false, false)}
                </MediaQuery>
            </div>
        );
    }
}
