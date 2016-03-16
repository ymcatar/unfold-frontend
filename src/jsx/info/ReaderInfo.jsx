import React from 'react';

import { connect } from 'react-redux';

import { Info as Colors } from 'config/Colors.jsx';

import EventDetail from './common/EventDetail.jsx';

import Information from './reader/Information.jsx';
import Translators from './reader/Translators.jsx';
import Contributors from './reader/Contributors.jsx';

const styles = {
    main: {
        background: Colors.background,
        color: Colors.color,
        height: '100vh',
        minWidth: '300px',
        width: '300px',
        padding: '20px 20px 50px 5px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        zIndex: 4
    }
};

class ReaderInfo extends React.Component {
    render() {
        let {event, info, contributors, translators} = this.props;
        return (
            <div style={styles.main}>
                <EventDetail title={event.title} description={event.description} />
                <Information data={info} />
                <Contributors data={contributors} />
                <Translators data={translators} />
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
