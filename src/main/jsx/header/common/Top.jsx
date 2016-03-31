import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { NavItem } from 'react-bootstrap';

import { scrollTo } from 'redux/actions/stream';
import { resetPostCount } from 'redux/actions/ajax';

import User from '../common/User.jsx';

class Top extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['handleClick']);
    }

    handleClick() {
        this.props.handleBackToTop();
    }

    render() {
        let label = 'TOP';
        if (this.props.count == 1)
            label = `${this.props.count} UPDATE`;
        else if (this.props.count > 1)
            label = `${this.props.count} UPDATES`;

        return (
            <NavItem href="#" onClick={this.handleClick}>
                <i className="material-icons">vertical_align_top</i>
                &nbsp;{label}
            </NavItem>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            count: (state.stream.filteredNewStream || []).length
        };
    },
    function dispatchToProps(dispatch, props) {
        return ({
            handleBackToTop: () => dispatch(scrollTo(0)),
            resetPostCount: () => dispatch(resetPostCount())
        });
    }
)(Top);
