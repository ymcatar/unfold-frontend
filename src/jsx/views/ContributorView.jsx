import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from 'config/Colors.jsx';

import RawStream from 'stream/RawStream.jsx';

import RawTimeline from 'timeline/RawTimeline.jsx';

import ContributorInfo from 'info/ContributorInfo.jsx';
import ContributorHeader from 'header/ContributorHeader.jsx';
import ContributorEditor from 'editor/ContributorEditor.jsx';

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
        let header = (<ContributorHeader />);
        let info = (<ContributorInfo />);
        let timeline = (<RawTimeline />);
        let stream = (
            <div style={styles.stream}>
                <RawStream />
            </div>
        );
        let editor = (<ContributorEditor />);

        const generateBody = (showInfo, showTimeline, showStream, showEditor) => (
            <div>
                <ContributorHeader />
                <div style={styles.main}>
                    {showInfo? info: null}
                    {showTimeline? timeline: null}
                    {showStream? stream: null}
                    {showEditor? editor: null}
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
                        {generateBody(true, true, true, true)}
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                        {generateBody(false, true, true, true)}
                    </MediaQuery>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    {generateBody(false, true, true, false)}
                </MediaQuery>
            </div>
        );
    }
}
