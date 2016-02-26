import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from 'config/Colors.jsx';

import ReaderHeader from 'header/ReaderHeader.jsx';

import ReaderStream from 'stream/ReaderStream.jsx';

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
    left: {
        backgroundColor: Colors.stream.backgroundColor,
        height: '100vh',
        width: '100%',
        paddingBottom: '50px'
    },
    mid: {
        backgroundColor: Colors.timeline.backgroundColor,
        width: '70px',
        minWidth: '70px',
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
    right: {
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

    constructor() {
        super();
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(test) {
        this.setState({filter: test});
    }

    render() {
        const generateBody = (stream, timeline, info, noAvatar) => {
            let streamComponent = small => (
                <div style={styles.left}>
                    <ReaderStream small={small} />
                </div>
            );

            let timelineComponent = (
                <div style={styles.mid}>
                    <Timeline />
                </div>
            );

            let infoComponent = (
                <div style={styles.right}>
                    <ReaderInfo />
                </div>
            );

            let l = stream? streamComponent(noAvatar): null;
            let m = timeline? timelineComponent: null;
            let r = info? infoComponent: null;
            return (
                <div>
                    <ReaderHeader />
                    <div style={styles.main}>
                        {l}
                        {m}
                        {r}
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
