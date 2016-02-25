import React from 'react';
import markdown from 'common/Markdown.js';

export default class TypeText extends React.Component {
    render() {
        let data = this.props.data || '';
        return (
            <div>
                <p dangerouslySetInnerHTML={{__html: markdown(data)}} />
            </div>
        );
    }
}
