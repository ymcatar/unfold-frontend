import React from 'react';
import { connect } from 'react-redux';
import {Button, Input} from 'react-bootstrap';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import Card from 'common/Card.jsx';

import PostEditor from './common/PostEditor.jsx';
import PostTags from './common/PostTags.jsx';
import { createPost } from '../actions/stream';

const styles = {
    main: {
        maxWidth: '100%',
        backgroundColor: Colors.editor.backgroundColor,
        width: '450px',
        height: '100vh',
        padding: '20px'
    },
    submit: {
        clear: 'left',
        display: 'block'
    }
};

class ContributorEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            content: '',
            tags: [],
            suggestions: ['Jason', 'is', 'amazing', 'amusing']
        };
        _.bindAll(this, [
            'handleContentChange',
            'handleTagsChange',
            'handleSourceChange',
            'handleSubmit'
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
        this.props.handleSubmit(output);
        this.setState({
            content: '',
            tags: [],
            path: ''
        });
    }

    render() {
        return (
            <div style={styles.main}>
                <h5>Content</h5>
                <PostEditor
                    handleContentChange={this.handleContentChange}
                    content={this.state.content} />

                <h5>Source Path</h5>
                <Input
                    ref="path"
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
                <Button
                    onClick={this.handleSubmit}
                    style={styles.submit}>
                    Submit
                </Button>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {};
    },
    function dispatchToProps(dispatch) {
        return {
            handleSubmit(post) {
                dispatch(createPost(post));
            }
        };
    }
)(ContributorEditor);
