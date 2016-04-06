import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, ButtonToolbar } from 'react-bootstrap';
import _ from 'lodash';

import { selectEditorPost } from 'redux/actions/ui';
import { putTranslation } from 'redux/actions/ajax';

import { Editor as Colors } from 'config/colors';

import PostEditor from './common/PostEditor.jsx';

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

class TranslatorEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: emptyPost, lang: 'en' };
        _.bindAll(this, [
            'handleContentChange',
            'handleSourceChange',
            'handleLangChange',
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

    handleLangChange(e) {
        this.setState({ lang: e.target.value });
    }

    handleSourceChange() {
        let { post } = this.state;
        post.data.url = this.refs.path.getValue();
        this.setState({ post });
    }

    handleSubmit() {
        let { caption, id } = this.state.post;
        let { lang } = this.state;
        let post = { translations: {} };
        post.translations[lang] = {
            content: caption
        };
        this.props.putTranslation(this.props.token, this.props.eventId, id, post);
    }

    resetClear() {
        this.setState({clear: false});
    }

    handleClear() {
        this.setState({ post: emptyPost, clear: true });
        this.props.clearEditorPost();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clear)
            this.setState({ clear: false });

        if (nextProps.post) {
            let { post } = nextProps;
            post = {
                id: post.id,
                caption: post.caption? post.caption: '',
                data: { url: post.data? post.data.url: '' }
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
                    disabled={true}
                    value={this.state.post.data? this.state.post.data.url: ""}
                    onChange={this.handleSourceChange}
                    bsSize="small"
                    type="text" />

                <p>Target Language</p>
                <Input
                    syule={styles.input}
                    value={this.state.lang}
                    onChange={this.handleLangChange}
                    bsSize="small"
                    type="select">
                    <option value="en">English</option>
                    <option value="zh-hant">Traditional Chinese</option>
                </Input>


                <ButtonToolbar style={styles.button}>
                    <Button
                        disabled={this.state.post.caption === '' || !this.state.post.data.url}
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
            putTranslation: (token, eventId, id, post) => dispatch(putTranslation(token, eventId, id, post))
        };
    }
)(TranslatorEditor);
