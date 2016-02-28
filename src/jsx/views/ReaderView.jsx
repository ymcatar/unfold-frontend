import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from 'config/Colors.jsx';

import Header from 'header/Header.jsx';

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
    },
    info: {
        backgroundColor: Colors.info.backgroundColor,
        color: Colors.info.color,
        height: '100vh',
        minWidth: '300px',
        width: '300px',
        padding: '20px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        boxShadow: Colors.zDepth,
        zIndex: 3
    }
};

export default class ReaderView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const generateBody = (stream, timeline, info, noAvatar) => {
            let streamComponent = small => (
                <div style={styles.stream}>
                    <Stream small={small} />
                </div>
            );

            let timelineComponent = (
                <div style={styles.timeline}>
                    <Timeline />
                </div>
            );

            let infoComponent = (
                <div style={styles.info}>
                    <ReaderInfo />
                </div>
            );

            let s = stream? streamComponent(noAvatar): null;
            let t = timeline? timelineComponent: null;
            let i = info? infoComponent: null;
            return (
                <div>
                    <Header />
                    <div style={styles.main}>
                        {i}
                        {t}
                        {s}
                    </div>
                </div>
            );
        };

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
