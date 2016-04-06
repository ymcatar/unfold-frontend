import React from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { selectFilter } from 'redux/actions/stream';
import { getTags } from 'redux/actions/ajax';

class TranslatorFilter extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['handleFilter', 'handleCustomFilter']);
    }

    componentWillMount() {
        this.props.getTags(this.props.eventId);
    }

    handleFilter(key) {
        if (typeof key === 'string')
            this.props.handleFilter(key);
    }

    handleCustomFilter(e, key) {
        if (typeof key === 'string')
            this.props.handleFilter(key);
    }

    render() {
        return (
            <Nav onSelect={this.handleFilter} activeKey={this.props.filter}>
                <NavItem disabled>TRANSLATOR</NavItem>
                <NavItem eventKey="all" href="#">all</NavItem>
                <NavItem eventKey="important" href="#">important</NavItem>
                <NavItem eventKey="reliable" href="#">reliable</NavItem>
                <NavDropdown title="other" id="other_tag" onSelect={this.handleCustomFilter}>
                    {this.props.tags
                        .filter(item => item.frequency > 1)
                        .sort((a, b) => b.frequency - a.frequency)
                        .map(item => (<MenuItem key={item.name} eventKey={item.name}>
                            <i className="zmdi zmdi-tag-more" />&nbsp;{item.name} ({item.frequency})
                        </MenuItem>))
                    }
                </NavDropdown>
            </Nav>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            filter: state.stream.filter,
            eventId: state.ui.eventId,
            tags: state.stream.tags || []
        };
    },
    function dispatchToProps(dispatch, props) {
        return {
            handleFilter: filter => dispatch(selectFilter(filter)),
            getTags: eventId => dispatch(getTags(eventId))
        };
}
)(TranslatorFilter);
