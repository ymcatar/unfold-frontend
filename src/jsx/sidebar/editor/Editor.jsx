import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, ButtonToolbar } from 'react-bootstrap';
import _ from 'lodash';

import { Editor as Colors } from 'config/colors';

import PostEditor from './common/PostEditor.jsx';
import PostTags from './common/PostTags.jsx';

import { selectAddedPost as rawSelectAddedPost } from 'redux/actions/raw';
import { selectAddedPost as streamSelectAddedPost } from 'redux/actions/stream';

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
            path: '',
            added: false
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.addedPost)
            return;
        let {tags, source, content} = nextProps.addedPost;
        tags = tags.map((o, i) => ({ id: i, text: o }));
        this.setState({
            path: source? source.path: '',
            tags: tags,
            content: content,
            added: true
        });
        this.props.clearAddedPost();
    }

    render() {
        return (
            <div>
                <PostEditor
                    handleContentChange={this.handleContentChange}
                    content={this.state.content} />
                <b>Source Path</b>
                <Input
                    ref="path"
                    style={styles.input}
                    disabled={this.state.added}
                    value={this.state.path}
                    onChange={this.handleSourceChange}
                    bsSize="small"
                    type="text" />

                <b>Tags</b><br />
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
                    <Button
                        onClick={this.handleClear}
                        bsStyle="primary"
                        bsSize="small">
                        Clear
                    </Button>
                </ButtonToolbar>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        if (props.type === 'raw')
            return {
                addedPost: state.raw.addedPost,
                sidebar: state.ui.sidebar
            };
        else if (props.type === 'stream')
            return {
                addedPost: state.stream.addedPost,
                sidebar: state.ui.sidebar
            };
    },
    function dispatchToProps(dispatch, props) {
        return {
            clearAddedPost() {
                if (props.type === 'raw')
                    dispatch(rawSelectAddedPost(null));
                else if (props.type === 'stream')
                    dispatch(streamSelectAddedPost(null));
            }
        };
    }
)(Editor);
