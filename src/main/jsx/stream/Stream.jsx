import React from 'react';
import _ from 'lodash';
import SweetScroll from "sweet-scroll";
import uuid from 'node-uuid';

import { connect } from 'react-redux';

import LazyLoad from 'react-lazyload';

import { getTimeline, dequeuePost } from 'redux/actions/ajax';
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

    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

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
        if (nextProps.queue.length > 0) {
            this.setState({ posts: this.state.posts.concat([nextProps.queue[0]]) });
            this.props.dequeuePost();
        }
    }

    render() {
        let posts = this.state.posts.map(post => (
            <LazyLoad key={uuid.v1()} wheel={true} scroll={false} offset={2500}>
                <UpdateBox data={post} role={this.props.role} />
            </LazyLoad>
        ));

        let elements = this.props.filteredStream.map(post => (
            <LazyLoad key={post.id} wheel={true} scroll={false} offset={2500}>
                <UpdateBox data={post} role={this.props.role} />
            </LazyLoad>
        ));

        return (
            <div style={styles.main} id="streamContainer">
                <div key="heading" style={styles.header}>
                    #{this.props.filter}
                </div>
                {posts}
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
                    queue: state.stream.queue || [],
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
                    resetScroll: () => dispatch(resetScroll()),
                    dequeuePost: () => dispatch(dequeuePost())
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
