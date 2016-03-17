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

let { arrayOf, shape, string, bool } = React.PropTypes;

ReaderInfo.propTypes = {
    event: shape({
        title: string.isRequired,
        description: string.isRequired
    }).isRequired,
    info: string.isRequired,
    contributors: arrayOf(
     shape({
            id: string,
            name: string.isRequired,
            title: string.isRequired,
            image: string.isRequired,
            online: bool.isRequired
        })),
    translators: arrayOf(
        shape({
            id: string,
            name: string.isRequired,
            title: string.isRequired,
            image: string.isRequired,
            online: bool.isRequired
        }))
};

ReaderInfo.defaultProps = {
    event: { title: '', description: '' },
    info: '',
    contributors: [],
    translators: []
};

export default connect(
    function stateToProps(state) {
        return state.event;
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(ReaderInfo);
