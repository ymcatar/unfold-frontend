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
        let stream = (<div style={styles.stream}><RawStream /></div>);
        let editor = (<ContributorEditor />);

        return (
            <div>
                <ContributorHeader />
                <div style={styles.main}>
                    <MediaQuery minDeviceWidth={1224} minWidth={800}>
                        {info}
                    </MediaQuery>
                    {timeline}
                    {stream}
                    {editor}
                </div>
            </div>
        );
    }
}
