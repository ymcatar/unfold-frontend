import React from 'react';
import {Button, Input} from 'react-bootstrap';

import Colors from 'config/Colors.jsx';

import PostEditor from './common/PostEditor.jsx';
import PostTags from './common/PostTags.jsx';

const styles = {
    main: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: 'white',
        boxShadow: Colors.zDepth,
        border: '3px #FFFFFF solid',
        borderRadius: '2px',
        padding: '10px'
    },
    submit: {
        clear: 'left',
        display: 'block'
    }
};

export default class ContributorEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            content: '',
            tags: [],
            suggestions: ['Jason', 'is', 'amazing', 'amusing']
        };
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.props.handleSubmit.call(this, output);
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
