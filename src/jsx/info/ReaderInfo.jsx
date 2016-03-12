import React from 'react';
import { connect } from 'react-redux';

import Colors from 'config/Colors.jsx';

import EventDetail from './common/EventDetail.jsx';

import Information from './reader/Information.jsx';
import Translators from './reader/Translators.jsx';
import Contributors from './reader/Contributors.jsx';

const styles = {
    main: {
        background: Colors.info.background,
        color: Colors.info.color,
        height: '100vh',
        minWidth: '300px',
        width: '300px',
        padding: '20px 20px 50px 20px',
        overflowY: 'scroll',
        overflowX: 'hidden',
    }
};

class ReaderInfo extends React.Component {
    render() {
        return (
            <div style={styles.main}>
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
