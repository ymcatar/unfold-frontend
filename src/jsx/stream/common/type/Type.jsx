import React from 'react';

import TypeEmbed from './TypeEmbed.jsx';
import TypeTwitter from './TypeTwitter.jsx';
import TypeFacebook from './TypeFacebook.jsx';

const embedMap = {
    twitter: TypeTwitter,
    youtube: TypeEmbed,
    flickr: TypeEmbed,
    imgur: TypeEmbed,
    facebook: TypeFacebook,
    text: null
};

export default class Type extends React.Component {
    render() {
        if (!this.props.path)
            return null;
        let Embed = embedMap[this.props.type];
        return (
            <Embed path={this.props.path} onResize={this.props.onResize} />
        );
    }
}
