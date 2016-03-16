import React from 'react';
import moment from 'moment';

import Card from 'common/Card.jsx';

import UpdateAvatar from './UpdateAvatar.jsx';

const styles = {
    avatar: {
        width: '48px'
    },
    info: {
        marginBottom: '20px',
        display: 'flex',
        padding: '10px',
        margin: '-15px -15px 10px -15px',
        borderBottom: '1px solid #eee'
    },
    name: {
        fontWeight: 'bolder'
    },
    time: {
        color: '#aaa',
        fontSize: 'smaller'
    },
    text: {
        marginLeft: '10px',
        lineHeight: '0.2',
    }
};

export default class ContributorInfo extends React.Component {
    render() {
        const {name, title, image, online} = this.props.contributor;
        const date = moment(this.props.submitTime);

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

        return (
            <div style={styles.info}>
                {avatar}
                <div style={styles.text}>
                    <h5 style={styles.name}>
                        {this.props.contributor.name}
                    </h5>
                    <p style={styles.time}>
                        {date.format("D MMM YYYY - HH:mm")}
                    </p>
                </div>
            </div>
        );
    }
}
