import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import RawBox from './common/RawBox.jsx';
import LazyScroller from './common/LazyScroller.jsx';
import { reportScroll, reportViewport } from 'actions/stream';

const styles = {
    main: {
        backgroundColor: Colors.stream.backgroundColor,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        width: '200px',
        color: Colors.stream.header,
        borderBottom: `2px ${Colors.stream.headerBorder} solid`,
        padding: '0 10px 5px 10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        fontWeight: '300',
        fontStyle: 'italic'
    }
};

export default class ReaderStream extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, [
            'createPlaceholder'
        ]);
    }

    createPlaceholder(key, height) {
        return (
            <RawBox
                type="stream"
                key={key}
                style={{height: height - 20}} />
        );
    }

    render() {
        let elements = this.props.filteredStream.map(post => (
            <RawBox
                type="stream"
                key={post.id}
                data={post} />
        ));
        return (
            <div style={styles.main}>
                <LazyScroller
                    position={this.props.position}
                    style={{
                        width: '100%',
                        height: 'calc(100vh - 50px)',
                        padding: '0 0 20px 0'
                    }}
                    onPositionChange={this.props.onReportScroll}
                    onLayoutChange={this.props.onReportViewport}
                    placeholderFunc={this.createPlaceholder}>
                    {[
                        <h2 key="heading" style={styles.header} height={70}>
                            #{this.props.filter}
                        </h2>
                    ].concat(elements)}
                </LazyScroller>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return _.pick(state.stream, 'filter', 'filteredStream', 'position');
    },
    function dispatchToProps(dispatch) {
        return {
            onReportScroll(position) {
                dispatch(reportScroll(position));
            },

            onReportViewport(viewport) {
                dispatch(reportViewport(viewport));
            }
        };
    }
)(ReaderStream);
