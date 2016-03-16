import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import RawBox from './common/RawBox.jsx';
import LazyScroller from './common/LazyScroller.jsx';
import { reportScroll, reportViewport } from '../actions/raw';

const styles = {
    main: {
        backgroundColor: Colors.stream.backgroundColor,
        height: 'calc(100vh - 10px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: '100px',
        fontSize: '60px',
        color: Colors.stream.header,
        padding: '30px 0 10px 20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        fontWeight: 'light',
    }
};

export default class RawStream extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, [
            'createPlaceholder'
        ]);
    }

    createPlaceholder(key, height) {
        return (
            <RawBox
                type="raw"
                key={key}
                style={{height: height - 20}} />
        );
    }

    render() {
        let elements = this.props.filteredStream.map(post => (
            <RawBox
                type="raw"
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
                        <h2 key="heading" style={styles.header} height={150}>
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
        return _.pick(state.raw, 'filter', 'filteredStream', 'position');
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
)(RawStream);
