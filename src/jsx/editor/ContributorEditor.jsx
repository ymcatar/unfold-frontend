import React from 'react';
import { connect } from 'react-redux';
import {Button, Input, ButtonToolbar} from 'react-bootstrap';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import Card from 'common/Card.jsx';

import PostEditor from './common/PostEditor.jsx';
import PostTags from './common/PostTags.jsx';
import { createPost, selectAddedPost } from 'actions/raw';

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

class ContributorEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: props.addedPost || '',
            content: '',
            tags: [],
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
        this.props.handleSubmit(output);
        this.setState({
            content: '',
            tags: [],
            path: ''
        });
        console.log(output);
    }

    handleClear() {
        this.setState({
            content: '',
            tags: [],
            path: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.addedPost)
            return;
        let tags = nextProps.addedPost.tags.map((o, i) => ({
            id: i,
            text: o
        }));
        this.setState({
            path: nextProps.addedPost.source.path,
            tags: tags
        });
        this.props.clearAddedPost();
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
    function stateToProps(state) {
        if (!state.raw.addedPost)
            return {};
        return {
            addedPost: state.raw.addedPost
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleSubmit(post) {
                dispatch(createPost(post));
            },
            clearAddedPost() {
                dispatch(selectAddedPost(null));
            }
        };
    }
)(ContributorEditor);
