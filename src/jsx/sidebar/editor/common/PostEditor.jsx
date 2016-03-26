import React from 'react';
import MediumEditor from 'react-medium-editor';
import MediumButton from 'common/MediumButton';

import { PostEditor as Colors } from 'config/colors';

const styles = {
    editor: {
        backgroundColor: Colors.backgroundColor,
        color: Colors.color,
        border: `1px ${Colors.border} solid`,
        borderRadius: '3px',
        padding: '10px',
        outline: 'none',
        height: '350px',
        overflowY: 'scroll',
        margin: '10px 0 10px 0',
        fontSize: '110%',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075)'
    }
};

const editorOptions = {
    placeholder: {
        text: ''
    },
    imageDragging: false,
    toolbar: {
        buttons: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'quote',
            'orderedlist',
            'unorderedlist',
            'h3',
            'h4',
            'translate'
        ]
    },
    extensions: {
        'translate': new MediumButton({
            label:'T',
            action: function(html, mark){
                return '突發事件: 示威者似乎正佔領尖沙咀廣東道。';
            }
        })
    }
};

export default class Editor extends React.Component {
    render() {
        return (
            <MediumEditor
                style={styles.editor}
                text={this.props.content}
                onChange={this.props.handleContentChange}
                options={editorOptions} />
            );
    }
}
