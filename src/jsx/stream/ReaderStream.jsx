import React from 'react';

import Colors from 'config/Colors.jsx';

import UpdateBox from './common/UpdateBox.jsx';
import LazyScroller from './common/LazyScroller.jsx';

const styles = {
    main: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        width: '200px',
        color: Colors.stream.header,
        borderBottom: `3px ${Colors.stream.headerBorder} solid`,
        padding: '0 10px 5px 10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
    }
};

export default class ReaderStream extends React.Component {
    constructor(props) {
        super(props);
    }

    createPlaceholder(key, height) {
        return (
            <UpdateBox
                key={key}
                style={{height: height - 20}}
                small={this.props.small} />
        );
    }

    render() {
        let elements = this.props.filteredStream.map(post => (
            <UpdateBox
                key={post.id}
                data={post}
                small={this.props.small} />
        ));
        return (
            <div style={styles.main} id="stream">
                <LazyScroller
                    position={this.props.position}
                    style={{width: '100%', height: 'calc(100vh - 50px)'}}
                    onPositionChange={this.props.onReportScroll}
                    onLayoutChange={this.props.onReportViewport}
                    placeholderFunc={this.createPlaceholder.bind(this)}>
                    {[
                        <h2 key="heading" style={styles.header} height={71}>
                            #{this.props.filter}
                        </h2>
                    ].concat(elements)}
                </LazyScroller>
            </div>
        );
    }
}
