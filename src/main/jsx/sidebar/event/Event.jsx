import React from 'react';
import { connect } from 'react-redux';

import { fetchEvent } from 'redux/actions/ajax';

import EventDetail from './common/EventDetail.jsx';
import Information from './common/Information.jsx';
import RoleList from './common/RoleList.jsx';

class ReaderSidebar extends React.Component {

    componentWillMount() {
        if (this.props.eventId)
            this.props.fetchEvent(this.props.eventId);
    }

    render() {

        let { title, description, information, roles } = this.props.event;
        let { startedAt, endedAt, location } = this.props.event;

        let owners = roles.filter(a => a.type == "OWNER");
        let contributors = roles.filter(a => a.type == "CONTRIBUTOR");
        let translators = roles.filter(a => a.type == "TRANSLATOR");

        return (
            <div>
                <EventDetail
                    title={title}
                    description={description}
                    location={location}
                    startedAt={startedAt}
                    endedAt={endedAt} />
                <Information data={information} />
                <RoleList data={owners} header="OWNER" />
                <RoleList data={contributors} header="CONTRIBUTORS" />
                <RoleList data={translators} header="TRANSLATORS" />
            </div>
        );
    }
}

ReaderSidebar.defaultProps = {
    event: {
        title: '',
        description: '',
        information: '',
        roles: [],
        startedAt: '',
        endedAt: '',
        location: ''
    }
};

export default connect(
    function stateToProps(state) {
        return {
            event: state.event,
            eventId: state.ui.eventId
        };
    },
    function dispatchToProps(dispatch) {
        return {
            fetchEvent: id => dispatch(fetchEvent(id))
        };
    }
)(ReaderSidebar);
