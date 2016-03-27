import React from 'react';
import MediaQuery from 'react-responsive';

import Header from 'header/Header.jsx';
import Stream from 'stream/Stream.jsx';
import Timeline from 'timeline/Timeline.jsx';
import Sidebar from 'sidebar/Sidebar.jsx';

import ContributorModal from 'modal/ContributorModal.jsx';

const styles = {
    main: {
        marginTop: '50px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowX: 'hidden'
    }
};

export default class ReaderView extends React.Component {
    render() {
        return (
            <div>
                <Header role="contributor" />
                <div style={styles.main}>
                    <Sidebar role="contributor" />
                    <Stream role="contributor" />
                    <Timeline type="raw" />
                    <ContributorModal />
                </div>
            </div>
        );
    }
}
