import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import * as StreamAction from 'redux/actions/stream';
import * as RawAction from 'redux/actions/raw';

import { Stream as Colors } from 'config/Colors.jsx';

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

    createPlaceholder(key, height) {
        return (
            <UpdateBox key={key} style={{height: height - 20}} type={this.props.type} />
        );
    }

    render() {
        let elements = this.props.filteredStream.map(post => (
            <UpdateBox key={post.id} data={post} type={this.props.type} />
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

let { shape, number, bool, string, arrayOf, func } = React.PropTypes;

Stream.propTypes = {
    position: shape({
        index: number.isRequired,
        offset: number.isRequired,
        scrollTop: number,
        force: bool,
        animate: bool
    }),
    filter: string.isRequired,
    filteredStream: arrayOf(shape({
        contributor: shape({
            id: string,
            name: string.isRequired,
            image: string.isRequired
        }),
        submitTime: string.isRequired,
        content: string,
        type: string.isRequired,
        source: shape({
            path: string.isRequired
        })
    })),
    onReportScroll: func.isRequired,
    onReportViewport: func.isRequired
};

export default connect(
    function stateToProps(state, props) {
        switch (props.type) {
            case 'stream':
                return _.pick(state.stream, 'filter', 'filteredStream', 'position');
            case 'raw':
                return _.pick(state.raw, 'filter', 'filteredStream', 'position');
            default:
                return {};
        }
    },
    function dispatchToProps(dispatch, props) {
        switch(props.type) {
            case 'stream':
                return {
                    onReportScroll: position => dispatch(StreamAction.reportScroll(position)),
                    onReportViewport: viewport => dispatch(StreamAction.reportViewport(viewport))
                };
            case 'raw':
                return {
                    onReportScroll: position => dispatch(RawAction.reportScroll(position)),
                    onReportViewport: viewport => dispatch(RawAction.reportViewport(viewport))
                };
            default:
                return {};
        }
    }
)(Stream);
