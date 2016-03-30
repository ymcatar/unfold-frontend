import React from 'react';

import TypeEmbed from './TypeEmbed.jsx';
import TypeTwitter from './TypeTwitter.jsx';
import TypeFacebook from './TypeFacebook.jsx';

const embedMap = {
    'twitter.com': TypeTwitter,
    'www.youtube.com': TypeEmbed,
    'www.flickr.com': TypeEmbed,
    'www.imgur.com': TypeEmbed,
    'www.facebook.com': TypeFacebook
};

export default class Type extends React.Component {
    render() {

        if (!this.props.path)
            return null;

        let Embed = embedMap[this.props.site];

        if (Embed)
            return (
                <Embed path={this.props.path} loaded={this.props.loaded} />
            );
        else
            return null;
    }
}
