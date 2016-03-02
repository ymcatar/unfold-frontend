import React from 'react';
import MediumEditor from 'react-medium-editor';
import { Button } from 'react-bootstrap';

import Colors from 'config/Colors.jsx';

const styles = {
    editor: {
        backgroundColor: Colors.editor.postEditor.backgroundColor,
        color: Colors.editor.postEditor.color,
        border: `1px ${Colors.editor.border} solid`,
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
            'h4'
        ]
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
