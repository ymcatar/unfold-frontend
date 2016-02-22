import React from 'react';
import uuid from 'node-uuid';

import Colors from 'config/Colors.jsx';

const getStyles = style => ({
    marginRight: '5px',
    color: style,
    fontWeight: '500'
});

export default class Tags extends React.Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(key) {
        this.props.handleFilter.call(this, key);
    }

    render() {
        if (!this.props.data || this.props.data === 0)
            return null;
        let tags = this.props.data.map(item => {
            let text, style;
            switch(item) {
                case 'reliable':
                    text = 'reliable';
                    style = Colors.stream.tags.reliable;
                    break;
                case 'important':
                    text = 'important';
                    style = Colors.stream.tags.important;
                    break;
                case 'unverified':
                    text = 'unverified';
                    style = Colors.stream.tags.unverified;
                    break;
                default:
                    text = item;
                    style = Colors.stream.tags.default;
                    break;
            }
            return (
                <a
                    style={getStyles(style)}
                    onClick={() => {this.handleClick(text); }}
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
