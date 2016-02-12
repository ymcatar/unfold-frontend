import React from 'react';
import markdown from 'common/Markdown.js';

export default class TypeText extends React.Component {
    render() {
        return (
            <div>
                <p dangerouslySetInnerHTML={{__html: markdown(this.props.data)}} />
            </div>
        );
    }
}
