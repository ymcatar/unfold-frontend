import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { selectFilter } from 'redux/actions/stream';

class ContributorFilter extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['handleFilter']);
    }

    handleFilter(key) {
        if (typeof key === 'string')
            this.props.handleFilter(key);
    }

    render() {
        return null;
        // return (
        //     <Nav onSelect={this.handleFilter} activeKey={this.props.filter}>
        //         <NavItem eventKey="all" href="#">all</NavItem>
        //         <NavItem eventKey="facebook" href="#">facebook</NavItem>
        //         <NavItem eventKey="twitter" href="#">twitter</NavItem>
        //         <NavItem eventKey="youtube" href="#">youtube</NavItem>
        //     </Nav>
        // );
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
)(ContributorFilter);
