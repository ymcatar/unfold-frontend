import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input';
import _ from 'lodash';

export default class PostTags extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        let tags = this.props.tags;
        tags.splice(i, 1);
        this.props.handleTagsChange.call(this, tags);
    }

    handleAddition(tag) {
        let tags = this.props.tags;
        if (!_.find(tags, o => o.text == tag))
            tags.push({ id: tags.length, text: tag });
        this.props.handleTagsChange.call(this, tags);
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.props.tags;
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
        this.props.handleTagsChange.call(this, tags);
    }

    render() {
        return (
            <div>
                <ReactTags
                    suggestions={this.props.suggestions}
                    tags={this.props.tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} />
            </div>
        );
    }
}
