import React from 'react';
import MediaQuery from 'react-responsive';

import { connect } from 'react-redux';
import { storeEventId } from 'redux/actions/ui';

import Header from 'header/Header.jsx';
import Stream from 'stream/Stream.jsx';
import Timeline from 'timeline/Timeline.jsx';
import Sidebar from 'sidebar/Sidebar.jsx';

import Loading from 'views/Loading.jsx';

import TranslatorModal from 'modal/TranslatorModal.jsx';

const styles = {
    main: loaded => ({
        marginTop: '50px',
        overflow: 'hidden',
        display: loaded? 'flex': 'none',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowX: 'hidden'
    }),

};

class TranslatorView extends React.Component {

    componentWillMount() {
        this.props.storeEventId(this.props.params.eventId);
    }

    render() {

        if (this.props.loaded && !this.props.isTranslator) {
            console.log(this.props.params.eventId);
            window.location = `../reader/${this.props.params.eventId}`;
            return;
        }

        return (
            <div>
                <Loading loaded={this.props.loaded} />
                <Header role="translator" />
                <div style={styles.main(this.props.loaded)}>
                    <Sidebar role="translator" />
                    <Stream role="translator" />
                    <TranslatorModal />
                 </div>
            </div>
        );
    }
}

export default connect (
    function stateToProps(state) {
        let isTranslator = state.event && state.event.roles && state.user?
            _.find(state.event.roles, { userId: state.user.id, type: "OWNER" }) ||
            _.find(state.event.roles, { userId: state.user.id, type: "TRANSLATOR" }): false;

        return { loaded: state.stream && state.event, isTranslator };
    },
    function dispatchToProps(dispatch, props) {
        return {
            storeEventId: val => dispatch(storeEventId(val))
        };
    }
)(TranslatorView);
