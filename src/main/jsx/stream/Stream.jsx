import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import { getTimeline } from 'redux/actions/ajax';
import * as StreamAction from 'redux/actions/stream';
import * as RawAction from 'redux/actions/raw';

import { Stream as Colors } from 'config/colors';

import UpdateBox from './common/UpdateBox.jsx';
import LazyScroller from './common/LazyScroller.jsx';

const styles = {
    main: {
        backgroundColor: Colors.backgroundColor,
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: '100px',
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
        _.bindAll(this, ['createPlaceholder']);
    }

    componentWillMount() {
        this.props.getTimeline(this.props.eventId);
    }

    createPlaceholder(key, height) {
        return (
            <UpdateBox key={key} style={{height: height - 20}} role={this.props.role} />
        );
    }

    render() {
        let elements = this.props.filteredStream.map(post => (
            <UpdateBox key={post.id} data={post} role={this.props.role} />
        ));
        return (
            <div style={styles.main}>
                <LazyScroller
                    position={this.props.position}
                    style={{width: '100%', height: 'calc(100vh - 50px)'}}
                    onPositionChange={this.props.onReportScroll}
                    onLayoutChange={this.props.onReportViewport}
                    placeholderFunc={this.createPlaceholder}>
                    {[
                        <div key="heading" style={styles.header} height={150}>
                            #{this.props.filter}
                        </div>
                    ].concat(elements)}
                </LazyScroller>
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
                    onReportScroll: position => dispatch(StreamAction.reportScroll(position)),
                    onReportViewport: viewport => dispatch(StreamAction.reportViewport(viewport)),
                    getTimeline: eventId => dispatch(getTimeline(eventId))
                };
            case 'contributor':
                return {
                    onReportScroll: position => dispatch(RawAction.reportScroll(position)),
                    onReportViewport: viewport => dispatch(RawAction.reportViewport(viewport)),
                    getTimeline: eventId => dispatch(getTimeline(eventId))
                };
            default:
                return {};
        }
    }
)(Stream);
