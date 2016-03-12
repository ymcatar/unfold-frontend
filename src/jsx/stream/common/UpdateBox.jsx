import React from 'react';
import MediaQuery from 'react-responsive';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import Card from 'common/Card.jsx';

import UpdateAvatar from './UpdateAvatar.jsx';
import Tags from './Tags.jsx';
import TypeText from './TypeText.jsx';
import TypeEmbed from './TypeEmbed.jsx';
import TypeTwitter from './TypeTwitter.jsx';
import TypeFacebook from './TypeFacebook.jsx';

const styles = {
    main: {
        width: '100%',
        maxWidth: '650px',
        display: 'flex',
        padding: '0 10px',
        margin: '5px auto'
    },
    avatar: {
        width: '48px'
    },
    info: {
        marginBottom: '20px',
        display: 'flex'
    },
    name: {
        marginLeft: '10px',
        lineHeight: '0.2'
    },
    time: {
        color: 'grey',
        fontSize: 'smaller'
    },
    content: {
        minWidth: '75%',
        maxWidth: '550px',
        margin: '10px 0px 10px 0px'
    },
    unverified: {
        marginTop: '10px'
    }
};

export default class UpdateBox extends React.Component {

    constructor(props) {
        super(props);
        _.bindAll(this, ['handleVerify']);
    }

    shouldComponentUpdate(nextProps) {
        let cond = this.props.data !== nextProps.data || this.props.small !== nextProps.small;
        if (cond)
            console.log('updating', this.key);
        return cond;
    }

    handleVerify() {
        this.props.handleVerify(this.props.data);
    }

    render() {
        if (!this.props.data) {
            // Placeholder
            let avatar = (<div style={styles.avatar} />);
            return (
                <div style={_.extend({}, styles.main, this.props.style)}>
                    {avatar}
                    <div style={styles.card} />
                </div>
            );
        }

        let EmbedClass = null;
        switch(this.props.data.type) {
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
        let content = EmbedClass ? (
            <EmbedClass
                data={this.props.data}
                onResize={this.props.onResize} />
        ) : null;

        const {name, title, image, online} = this.props.data.contributor;
        const date = moment(this.props.data.submitTime);
        let avatar = (
            <div style={styles.avatar}>
                <UpdateAvatar
                    name={name}
                    title={title}
                    image={image}
                    online={online}
                    size="48" />
            </div>
        );

        let tags = this.props.data.tags && this.props.data.tags.length > 0? (
            <Tags data={this.props.data.tags} />
        ): null;

        let unverified = this.props.data.tags && this.props.data.tags.indexOf('unverified') >= 0? (
            <Button
                bsStyle="warning"
                bsSize="small" style={styles.unverified}
                onClick={this.handleVerify}>
                Submit Proofs
            </Button>
        ): null;

        return (
            <div style={_.extend({}, styles.main, this.props.style)}>
                <Card>
                    <div style={styles.info}>
                        {avatar}
                        <div style={styles.name}>
                            <h5>
                                {this.props.data.contributor.name}
                            </h5>
                            <p style={styles.time}>
                                {date.format("D MMM YYYY - HH:mm")}
                            </p>
                        </div>
                    </div>
                    <div style={styles.content}>
                        <TypeText data={this.props.data.content} />
                        {content}
                    </div>
                    <div>
                        {tags}
                        {unverified}
                    </div>
                </Card>
            </div>
        );
    }
}
