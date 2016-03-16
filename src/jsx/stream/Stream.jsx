import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';
import { reportScroll, reportViewport } from 'redux/actions/stream';

import { Stream as Colors } from 'config/Colors.jsx';

import UpdateBox from './common/UpdateBox.jsx';
import LazyScroller from './common/LazyScroller.jsx';

const styles = {
    main: {
        backgroundColor: Colors.backgroundColor,
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
        color: Colors.header,
        padding: '30px 0 10px 20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        fontWeight: 'light',
    }
};

export default class Stream extends React.Component {
    constructor(props) {
        super(props);
        _.bindAll(this, ['createPlaceholder']);
    }

    createPlaceholder(key, height) {
        return (
            <UpdateBox key={key} style={{height: height - 20}} />
        );
    }

    render() {
        let elements = this.props.filteredStream.map(post => (
            <UpdateBox key={post.id} data={post} />
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
    function stateToProps(state) {
        return _.pick(state.stream, 'filter', 'filteredStream', 'position');
    },
    function dispatchToProps(dispatch) {
        return {
            onReportScroll: position => dispatch(reportScroll(position)),
            onReportViewport: viewport => dispatch(reportViewport(viewport))
        };
    }
)(Stream);
