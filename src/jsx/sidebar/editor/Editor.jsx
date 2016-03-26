import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, ButtonToolbar } from 'react-bootstrap';
import _ from 'lodash';

import { selectEditorPost } from 'redux/actions/ui';

import { Editor as Colors } from 'config/colors';

import PostEditor from './common/PostEditor.jsx';
import PostTags from './common/PostTags.jsx';

const styles = {
    button: {
        clear: 'left',
        display: 'block',
        paddingTop: '20px'
    },
    input: {
        backgroundColor: Colors.inputBackground,
        color: Colors.inputColor,
        border: `1px ${Colors.inputBorder} solid`
    }
};

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: props.addedPost || '',
            content: '',
            tags: [],
            added: false,
            suggestions: ['important', 'reliable', 'unverified', 'facebook', 'twitter', 'CausewayBay', 'Mongkok', 'Central']
        };
        _.bindAll(this, [
            'handleContentChange',
            'handleTagsChange',
            'handleSourceChange',
            'handleSubmit',
            'handleClear'
        ]);
    }

    handleContentChange(content) {
        this.setState({content: content});
    }

    handleTagsChange(tags) {
        this.setState({tags: tags});
    }

    handleSourceChange() {
        this.setState({path: this.refs.path.getValue()});
    }

    handleSubmit() {
        let output = {
            content: this.state.content,
            tags: this.state.tags.map(item => item.text),
            source: {
                path: this.state.path
            }
        };
        console.log(output);
        this.handleClear();
    }

    handleClear() {
        this.setState({
            content: '',
            tags: [],
            path: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.editorPost)
            return;
        let {tags, source, content} = nextProps.editorPost;
        tags = tags.map((o, i) => ({ id: i, text: o }));
        this.setState({
            path: source? source.path: '',
            tags: tags,
            content: content,
            added: true
        });
        this.props.clearEditorPost();
    }

    render() {
        return (
            <div>
                <i>(Click to edit. Select to add formating.)</i>
                <PostEditor
                    handleContentChange={this.handleContentChange}
                    content={this.state.content} />
                <p>Source Path</p>
                <Input
                    ref="path"
                    style={styles.input}
                    disabled={this.state.added}
                    value={this.state.path}
                    onChange={this.handleSourceChange}
                    bsSize="small"
                    type="text" />

                <p>Tags</p>
                <PostTags
                    suggestions={this.state.suggestions}
                    tags={this.state.tags}
                    handleTagsChange={this.handleTagsChange} />
                <br />
                <ButtonToolbar style={styles.button}>
                    <Button
                        onClick={this.handleSubmit}
                        bsStyle="primary"
                        bsSize="small">
                        Submit
                    </Button>
                    {/*
                        // Remove clear until medium editor bug resolved
                        <Button
                            onClick={this.handleClear}
                            bsStyle="primary"
                            bsSize="small">
                            Clear
                        </Button>
                    */}
                </ButtonToolbar>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            sidebar: state.ui.sidebar,
            editorPost: state.ui.editorPost
        };
    },
    function dispatchToProps(dispatch, props) {
        return {
            clearEditorPost: () => dispatch(selectEditorPost(null))
        };
    }
)(Editor);
