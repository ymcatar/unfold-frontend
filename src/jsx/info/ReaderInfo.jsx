import React from 'react';
import { connect } from 'react-redux';

import EventDetail from './common/EventDetail.jsx';

import Information from './reader/Information.jsx';
import Translators from './reader/Translators.jsx';
import Contributors from './reader/Contributors.jsx';

class ReaderInfo extends React.Component {
    render() {
        return (
            <div>
                <EventDetail
                    title={this.props.event.title}
                    description={this.props.event.description} />

                <Information data={this.props.info} />

                <Contributors data={this.props.contributors} />
                <Translators data={this.props.translators} />
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return state.event;
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(ReaderInfo);
