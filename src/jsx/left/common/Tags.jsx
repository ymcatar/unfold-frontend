import React from 'react';
import uuid from 'node-uuid';

import Colors from 'config/Colors.jsx';

const getStyles = style => ({
    marginRight: '5px',
    color: style,
    fontWeight: 'bolder'
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
                    style = Colors.left.tags.reliable;
                    break;
                case 'important':
                    text = 'important';
                    style = Colors.left.tags.important;
                    break;
                case 'unverified':
                    text = 'unverified';
                    style = Colors.left.tags.unverified;
                    break;
                default:
                    text = item;
                    style = Colors.left.tags.default;
                    break;
            }
            return (
                <a
                    style={getStyles(style)}
                    key={uuid.v1()}
                    href="#">
                    #{text}
                </a>
            );
        });
        return (
            <div>
                {tags}
            </div>
        );
    }
}
