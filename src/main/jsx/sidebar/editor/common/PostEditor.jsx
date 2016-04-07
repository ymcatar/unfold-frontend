import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import _ from 'lodash';
import MediumEditor from 'react-medium-editor';
import MediumButton from 'common/MediumButton';

import { domain } from 'config/config';
import { showSuccess } from 'redux/actions/modal';

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

let editorOptions =  {
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
    extensions: {}
};

const getTranslate = (token, data) => new Promise((resolve, reject) => {
    fetch(`${domain}/translate`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(msg => resolve(msg.content))
    .catch(err => reject(error));
});

class PostEditor extends React.Component {

    constructor(props) {
        super(props);
        _.bindAll(this, ['handleContentChange']);
    }

    handleContentChange() {
        this.props.handleContentChange(ReactDOM.findDOMNode(this.elm).innerHTML);
    }

    changeText(text) {
        this.elm.state.text = text;
        ReactDOM.findDOMNode(this.elm).innerHTML = text;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clear) {
            this.changeText('');
            this.props.resetClear();
        }
        if (!_.eq(this.props.post, nextProps.post) && nextProps.post && nextProps.post.caption)
            this.changeText(nextProps.post.caption);
    }

    render() {
        if (this.props.type === 'translator') {
            let that = this;
            editorOptions.extensions.translate = new MediumButton({
                label:'<i class="zmdi zmdi-translate" />',
                action: (html, mark) => {
                    getTranslate(this.props.token, {
                        to: this.props.lang,
                        content: html
                    })
                    .then(msg => {
                        that.props.showSuccess(msg);
                    });
                    return html;
                }
            });
        }
        return (
            <MediumEditor
                ref={x => { this.elm = x; }}
                style={styles.editor}
                onChange={this.handleContentChange}
                options={editorOptions} />
            );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            token: state.auth? state.auth.token: null,
            post: state.ui.editorPost,
        };
    },
    function dispatchToProps(dispatch, props) {
        return {
            showSuccess: msg => dispatch(showSuccess(msg))
        };
    }
)(PostEditor);
