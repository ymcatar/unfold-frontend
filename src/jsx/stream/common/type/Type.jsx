import React from 'react';

import TypeEmbed from './TypeEmbed.jsx';
import TypeTwitter from './TypeTwitter.jsx';
import TypeFacebook from './TypeFacebook.jsx';

export default class Type extends React.Component {
    render() {

        if (!this.props.path)
            return null;

        let EmbedClass = null;
        switch(this.props.type) {
            case 'text':
                break;
            case 'twitter':
                EmbedClass = TypeTwitter;
                break;
            case 'youtube':
            case 'flickr':
            case 'imgur':
                EmbedClass = TypeEmbed;
                break;
            case 'facebook':
                EmbedClass = TypeFacebook;
                break;
        }

        return (
            <EmbedClass
                path={this.props.path}
                onResize={this.props.onResize} />
        );
    }
}
