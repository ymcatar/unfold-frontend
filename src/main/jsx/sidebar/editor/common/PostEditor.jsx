import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import _ from 'lodash';
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
        height: '250px',
        overflowY: 'scroll',
        margin: '10px 0 10px 0',
        fontSize: '110%',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075)'
    }
};

const editorOptions = changeHandler => ({
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
            label:'<i class="zmdi zmdi-translate" />',
            action: function(html, mark){
                let translated = '突發事件: 示威者似乎正佔領尖沙咀廣東道。';
                setTimeout(() => {
                    changeHandler();
                }, 100);
                return translated;
            }
        })
    }
});

class PostEditor extends React.Component {

    constructor(props) {
        super(props);
        _.bindAll(this, ['handleContentChange']);
    }

    handleContentChange() {
        this.props.handleContentChange(ReactDOM.findDOMNode(this.elm).innerHTML);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clear)
            ReactDOM.findDOMNode(this.elm).innerHTML = '';
        if (this.props.content !== nextProps.content)
            ReactDOM.findDOMNode(this.elm).innerHTML = nextProps.content;
    }

    render() {
        return (
            <MediumEditor
                ref={x => { this.elm = x; }}
                style={styles.editor}
                onChange={this.handleContentChange}
                options={editorOptions(this.handleContentChange)} />
            );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            post: state.ui.editorPost
        };
    },
    function dispatchToProps(dispatch, props) {
        return { };
    }
)(PostEditor);
