import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { selectFilter } from 'redux/actions/stream';

class ReaderFilter extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['handleFilter']);
    }

    handleFilter(key) {
        if (typeof key === 'string')
            this.props.handleFilter(key);
    }

    render() {
        return (
            <Nav onSelect={this.handleFilter} activeKey={this.props.filter}>
                <NavItem eventKey="all" href="#">all</NavItem>
                <NavItem eventKey="important" href="#">important</NavItem>
                <NavItem eventKey="reliable" href="#">reliable</NavItem>
            </Nav>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            filter: state.stream.filter
        };
    },
    function dispatchToProps(dispatch, props) {
        return {
            handleFilter: filter => dispatch(selectFilter(filter)),
        };
}
)(ReaderFilter);
