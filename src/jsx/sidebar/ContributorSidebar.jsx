import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';

import { switchSidebar } from 'redux/actions/ui';

import Editor from './editor/Editor.jsx';
import Event from './event/Event.jsx';

const getShowStyle = visible => ({
    display: visible? 'block': 'none'
});

const styles = {
    nav: {
        borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
        marginBottom: '40px'
    }
};

class ContributorSidebar extends React.Component {
    render() {
        let editor = (this.props.active === "post");
        let event = (this.props.active === "event");
        return (
            <div>
                <div style={styles.nav}>
                    <Nav
                        bsStyle="pills"
                        justified
                        activeKey={this.props.active}
                        onSelect={this.props.handleSelect}>
                        <NavItem eventKey="event">Event</NavItem>
                        <NavItem eventKey="post">Post</NavItem>
                    </Nav>
                </div>
                <div style={getShowStyle(editor)}>
                    <Editor type="raw" />
                </div>
                <div style={getShowStyle(event)}>
                    <Event />
                </div>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            active: state.ui.sidebarActive
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleSelect: val => dispatch(switchSidebar(val))
        };
    }
)(ContributorSidebar);
