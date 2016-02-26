import React from 'react';
import Editor from 'react-medium-editor';
import {Button} from 'react-bootstrap';

import Colors from 'config/Colors.jsx';

const styles = {
    editor: {
        border: `1px ${Colors.editor.border} solid`,
        borderRadius: '3px',
        padding: '10px',
        outline: 'none',
        height: '250px',
        overflowY: 'scroll',
        margin: '10px 0 10px 0',
        fontSize: '110%',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075)'
    }
};

const editorOptions = {
    placeholder: {
        text: 'Type your text here. Select text to add formating.',
        hideOnClick: true
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
            'h4'
        ],
    }
};

export default class PostEditor extends React.Component {
    render() {
        return (
            <Editor style={styles.editor} text={this.props.text} onChange={this.props.handleContentChange.bind(this)} options={editorOptions}/>
        );
    }
}
