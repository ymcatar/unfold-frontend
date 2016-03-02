import React from 'react';
import { connect } from 'react-redux';
import {Button, Input, ButtonToolbar} from 'react-bootstrap';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import Card from 'common/Card.jsx';

import PostEditor from './common/PostEditor.jsx';
import PostTags from './common/PostTags.jsx';

import { selectAddedPost as rawSelectAddedPost } from 'actions/raw';
import { selectAddedPost as streamSelectAddedPost } from 'actions/stream';

const styles = {
    main: {
        maxWidth: '100%',
        backgroundColor: Colors.editor.backgroundColor,
        color: Colors.editor.color,
        width: '450px',
        height: '100vh',
        padding: '20px',
        boxShadow: Colors.zDepth,
        zIndex: 3
    },
    button: {
        clear: 'left',
        display: 'block',
        paddingTop: '20px'
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
            <div style={styles.main}>
                <h5>Content</h5>
                <i>(Click to edit. Select to add formatting.)</i>
                <PostEditor
                    handleContentChange={this.handleContentChange}
                    content={this.state.content} />
                <h5>Source Path</h5>
                <Input
                    ref="path"
                    disabled={this.state.added}
                    value={this.state.path}
                    onChange={this.handleSourceChange}
                    bsSize="small"
                    type="text" />

                <h5>Tags</h5>
                <PostTags
                    suggestions={this.state.suggestions}
                    tags={this.state.tags}
                    handleTagsChange={this.handleTagsChange} />
                <br />
                <ButtonToolbar style={styles.button}>
                    <Button
                        onClick={this.handleSubmit}
                        bsStyle="success"
                        bsSize="small">
                        Submit
                    </Button>
                    <Button
                        onClick={this.handleClear}
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
            return { addedPost: state.raw.addedPost };
        else if (props.type === 'stream')
            return { addedPost: state.stream.addedPost };
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
