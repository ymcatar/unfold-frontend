import React from 'react';
import { connect } from 'react-redux';
import uuid from 'node-uuid';

import { Tags as Colors } from 'config/Colors.jsx';
import { selectFilter } from 'redux/actions/stream';

const getStyles = style => ({
    marginRight: '5px',
    color: style,
    fontWeight: 'bold'
});

export default class Tags extends React.Component {
    render() {
        if (!this.props.data || this.props.data === 0)
            return null;
        let tags = this.props.data.map(item => {
            let text, style;
            switch(item) {
                case 'reliable':
                    text = 'reliable';
                    style = Colors.reliable;
                    break;
                case 'important':
                    text = 'important';
                    style = Colors.important;
                    break;
                case 'unverified':
                    text = 'unverified';
                    style = Colors.unverified;
                    break;
                default:
                    text = item;
                    style = Colors.default;
                    break;
            }
            return (
                <a
                    style={getStyles(style)}
                    onClick={() => {this.props.handleFilter(text);}}
                    key={uuid.v1()}
                    href="#">
                    #{text}
                </a>
            );
        });
        return (
            <div>
                <i className="fa fa-tag">&nbsp;</i>
                {tags}
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {};
    },
    function dispatchToProps(dispatch) {
        return {
            handleFilter(filter) {
                dispatch(selectFilter(filter));
            }
        };
    }
)(Tags);
