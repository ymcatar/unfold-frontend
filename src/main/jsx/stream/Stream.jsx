import React from 'react';
import _ from 'lodash';
import SweetScroll from "sweet-scroll";

import { connect } from 'react-redux';

import LazyLoad from 'react-lazyload';

import { getTimeline } from 'redux/actions/ajax';
import { resetScroll } from 'redux/actions/stream';
// import * as RawAction from 'redux/actions/raw';

import { Stream as Colors } from 'config/colors';

import UpdateBox from './common/UpdateBox.jsx';

const styles = {
    main: {
        backgroundColor: Colors.backgroundColor,
        height: '100vh',
        width: '100%',
        paddingBottom: '100px',
        overflowY: 'scroll'
    },
    header: {
        width: '100%',
        height: '150px',
        fontSize: '60px',
        color: Colors.header,
        padding: '30px 0 10px 20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        fontWeight: 'lighter'
    }
};

export default class Stream extends React.Component {

    componentWillMount() {
        this.props.getTimeline(this.props.eventId);
    }

    componentDidMount() {
        this.sweetScroll = new SweetScroll({}, "#streamContainer");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.scrollPending) {
            this.sweetScroll.to({ top: nextProps.position });
            this.props.resetScroll();
        }
    }

    render() {
        let elements = this.props.filteredStream.map(post => (
            <LazyLoad wheel={true} scroll={false} offset={2500}>
                <UpdateBox key={post.id} data={post} role={this.props.role} />
            </LazyLoad>
        ));
        return (
            <div style={styles.main} id="streamContainer">
                <div key="heading" style={styles.header}>
                    #{this.props.filter}
                </div>
                {elements}
            </div>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        switch (props.role) {
            case 'reader':
            case 'translator':
                return {
                    filter: state.stream.filter,
                    filteredStream: state.stream.filteredStream,
                    scrollPending: state.stream.scrollPending,
                    position: state.stream.position,
                    eventId: state.ui.eventId
                };
            case 'contributor':
                return {
                    filter: state.raw.filter,
                    filteredStream: state.raw.filteredStream,
                    position: state.raw.position,
                    eventId: state.ui.eventId
                };
            default:
                return {};
        }
    },
    function dispatchToProps(dispatch, props) {
        switch(props.role) {
            case 'reader':
            case 'translator':
                return {
                    getTimeline: eventId => dispatch(getTimeline(eventId)),
                    resetScroll: () => dispatch(resetScroll())
                };
            case 'contributor':
                return {
                    getTimeline: eventId => dispatch(getTimeline(eventId)),
                    resetScroll: () => dispatch(resetScroll())
                };
            default:
                return {};
        }
    }
)(Stream);
