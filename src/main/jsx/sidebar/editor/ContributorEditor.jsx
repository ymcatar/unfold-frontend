import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, ButtonToolbar } from 'react-bootstrap';
import _ from 'lodash';

import { selectEditorPost } from 'redux/actions/ui';
import { postPost } from 'redux/actions/ajax';

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

const emptyPost = {
    caption: '',
    data: {
        url: ''
    },
    tags: []
};

class ContributorEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: emptyPost,
            added: false,
            suggestions: ['important', 'reliable', 'unverified']
        };
        _.bindAll(this, [
            'handleContentChange',
            'handleTagsChange',
            'handleSourceChange',
            'handleSubmit',
            'handleClear',
            'resetClear'
        ]);
    }

    handleContentChange(caption) {
        let { post } = this.state;
        post.caption = caption;
        this.setState({ post });
    }

    handleTagsChange(tags) {
        let { post } = this.state;
        post.tags = tags;
        this.setState({ post });
    }

    handleSourceChange() {
        let { post } = this.state;
        post.data.url = this.refs.path.getValue();
        this.setState({ post });
    }

    handleSubmit() {
        let { post } = this.state;
        if (post.data && post.data.url === '')
            delete post.data;
        if (post.caption === '')
            delete post.caption;

        post.tags = post.tags.map(item => item.text);
        this.props.postPost(this.props.token, this.props.eventId, post); // wow, so many post
        this.handleClear();
    }

    resetClear() {
        this.setState({clear: false});
    }

    handleClear() {
        this.setState({ post: emptyPost, added: false, clear: true });
        this.props.clearEditorPost();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clear)
            this.setState({ clear: false });

        if (nextProps.post) {
            let { post } = nextProps;
            post = {
                caption: post.caption? post.caption: '',
                data: { url: post.data? post.data.url: '' },
                tags: (post.tags || []).map((o, i) => ({ id: i, text: o }))
            };
            this.setState({ post, added: true });
        }
    }

    render() {
        return (
            <div>
                <i>(Click to edit. Select to add formating.)</i>
                <PostEditor
                    resetClear={this.resetClear}
                    clear={this.state.clear}
                    handleContentChange={this.handleContentChange}
                    content={this.state.post.caption} />

                <p>Source Path</p>
                <Input
                    style={styles.input}
                    disabled={this.props.post}
                    value={this.state.post.data? this.state.post.data.url: ""}
                    onChange={this.handleSourceChange}
                    bsSize="small"
                    type="text" />

                <p>Tags</p>
                <PostTags
                    suggestions={this.state.suggestions}
                    tags={this.state.post.tags || []}
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
        return {
            token: state.auth? state.auth.token: undefined,
            eventId: state.ui.eventId,
            sidebar: state.ui.sidebar,
            post: state.ui.editorPost
        };
    },
    function dispatchToProps(dispatch, props) {
        return {
            clearEditorPost: () => dispatch(selectEditorPost(null)),
            postPost: (token, eventId, post) => dispatch(postPost(token, eventId, post))
        };
    }
)(ContributorEditor);
