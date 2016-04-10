import React from 'react';
import MediaQuery from 'react-responsive';

import { connect } from 'react-redux';
import { storeEventId } from 'redux/actions/ui';

import Header from 'header/Header.jsx';
import Stream from 'stream/Stream.jsx';
import Timeline from 'timeline/Timeline.jsx';
import Sidebar from 'sidebar/Sidebar.jsx';

import ContributorModal from 'modal/ContributorModal.jsx';

import Loading from 'views/Loading.jsx';

const styles = {
    main: loaded => ({
        marginTop: '50px',
        overflow: 'hidden',
        display: loaded? 'flex': 'none',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowX: 'hidden'
    })
};

class ContributorView extends React.Component {

    componentWillMount() {
        this.props.storeEventId(this.props.params.eventId);
    }

    render() {

        if (this.props.loaded && !this.props.isContributor) {
            console.log(this.props.params.eventId);
            window.location = `/main/reader/${this.props.params.eventId}`;
            return;
        }

        return (
            <div>
                <Loading loaded={this.props.loaded} />
                <Header role="contributor" />
                <div style={styles.main(this.props.loaded)}>
                    <Sidebar role="contributor" />
                    <Stream role="contributor" />
                    <ContributorModal />
                </div>
            </div>
        );
    }
}

export default connect (
    function stateToProps(state) {

        let isContributor = state.event && state.event.roles && state.user?
            _.find(state.event.roles, { userId: state.user.id, type: "OWNER" }) ||
            _.find(state.event.roles, { userId: state.user.id, type: "CONTRIBUTOR" }): false;

        return { loaded: state.stream && state.event, isContributor };
    },
    function dispatchToProps(dispatch, props) {
        return {
            storeEventId: val => dispatch(storeEventId(val))
        };
    }
)(ContributorView);
