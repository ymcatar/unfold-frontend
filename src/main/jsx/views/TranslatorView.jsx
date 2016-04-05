import React from 'react';
import MediaQuery from 'react-responsive';

import { connect } from 'react-redux';
import { storeEventId } from 'redux/actions/ui';

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

class TranslatorView extends React.Component {

    componentWillMount() {
        this.props.storeEventId(this.props.params.eventId);
    }

    render() {
        return (
            <div>
                <Header role="contributor" />
                <div style={styles.main}>
                    <Sidebar role="translator" />
                    <Stream role="translator" />
                    {/* <ContributorModal /> */}
                 </div>
            </div>
        );
    }
}

export default connect (
    function stateToProps(state) {
        return {};
    },
    function dispatchToProps(dispatch, props) {
        return {
            storeEventId: val => dispatch(storeEventId(val))
        };
    }
)(TranslatorView);
