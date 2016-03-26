import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { fetchEvent } from 'redux/actions/event';
import { toggleSidebar } from 'redux/actions/ui';

import { Info as Colors } from 'config/colors';

import EventDetail from './common/EventDetail.jsx';
import Information from './common/Information.jsx';
import RoleList from './common/RoleList.jsx';

const styles = {
    main: (show, mobile) => ({
        background: Colors.background,
        color: Colors.color,
        height: '100vh',
        zIndex: 4,
        overflowY: 'scroll',
        boxShadow: Colors.zDepth,
        width: mobile? '90vw': '300px',
        minWidth: mobile? '90vw': '300px',
        padding: '20px',
        display: show? 'block': 'none'
    })
};

const isMobile = () => window.matchMedia("(max-device-width: 1224px)").matches;
const isSmall = () => window.matchMedia("(max-width: 800px)").matches;

class Sidebar extends React.Component {
    componentWillMount() {
        this.props.fetchEvent();
        if (this.props.mobile)
            this.props.hideSidebar();
    }

    render() {
        let { title, description, information, roles } = this.props.event;
        let { startedAt, endedAt, location } = this.props.event;
        let { show } = this.props;

        let owners = roles.filter(a => a.type == "OWNER");
        let contributors = roles.filter(a => a.type == "CONTRIBUTOR");
        let translators = roles.filter(a => a.type == "TRANSLATOR");

        return (
            <div style={styles.main(show, this.props.mobile)}>
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

let { arrayOf, shape, string, bool, number } = React.PropTypes;

Sidebar.propTypes = {
    event: shape({
        title: string,
        location: string,
        tags: arrayOf(string),
        description: string,
        information: string,
        startedAt: string,
        endedAt: string,
        timezone: number,
        language: string,
        roles: arrayOf(shape({
            type: string,
            user: shape({
                id: string,
                name: string,
                description: string
            })
        }))
    }),
    show: bool.isRequired,
    mobile: bool.isRequired
};

export default connect(
    function stateToProps(state) {
        return {
            event: state.event,
            show: state.ui.sidebar
        };
    },
    function dispatchToProps(dispatch) {
        return {
            fetchEvent: id => dispatch(fetchEvent(id)),
            hideSidebar: val => dispatch(toggleSidebar(false))
        };
    }
)(Sidebar);
