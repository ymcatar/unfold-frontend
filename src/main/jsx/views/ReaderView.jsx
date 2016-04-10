import React from 'react';
import MediaQuery from 'react-responsive';

import { connect } from 'react-redux';
import { storeEventId } from 'redux/actions/ui';
import { simulatePost } from 'redux/actions/ajax';

import Header from 'header/Header.jsx';
import Stream from 'stream/Stream.jsx';
import Timeline from 'timeline/Timeline.jsx';
import Sidebar from 'sidebar/Sidebar.jsx';

import Loading from 'views/Loading.jsx';

import ReaderModal from 'modal/ReaderModal.jsx';

const styles = {
    main: loaded => ({
        paddingTop: '50px',
        overflow: 'hidden',
        display: loaded? 'flex': 'none',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'hidden'
    })
};

class ReaderView extends React.Component {

    componentWillMount() {
        this.props.storeEventId(this.props.params.eventId);
    }

    render() {
        return (
            <div>
                <Loading loaded={this.props.loaded} />
                <Header role="reader" />
                <div style={styles.main(this.props.loaded)}>
                    <MediaQuery minDeviceWidth={1224} minWidth={800}>
                       <Sidebar mobile={false} role="reader"/>
                    </MediaQuery>
                    <MediaQuery maxWidth={800}>
                        <Sidebar mobile={true} role="reader"/>
                    </MediaQuery>
                    <Stream role="reader" />
                    <Timeline type="stream" />
                    <ReaderModal />
                </div>
            </div>
        );
    }
}

export default connect (
    function stateToProps(state) {
        return {
            loaded: state.stream && state.event
        };
    },
    function dispatchToProps(dispatch, props) {
        return {
            storeEventId: val => dispatch(storeEventId(val)),
            simulatePost: () => dispatch(simulatePost())
        };
    }
)(ReaderView);
