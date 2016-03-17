import React from 'react';
import moment from 'moment';

import { Image } from 'react-bootstrap';

import Card from 'common/Card.jsx';

const styles = {
    avatar: {
        width: '48px',
        height: '48px'
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
        return (
            <div style={styles.info}>
                <Image src={image} circle style={styles.avatar} />
                <div style={styles.text}>
                    <h5 style={styles.name}>{name}</h5>
                    <p style={styles.time}>{date.format("D MMM YYYY - HH:mm")}</p>
                </div>
            </div>
        );
    }
}

let { string, shape, bool } = React.PropTypes;

ContributorInfo.propTypes = {
    contributor: shape({
        id: string,
        name: string.isRequired,
        title: string.isRequired,
        image: string.isRequired,
        online: bool.isRequired
    }),
    submitTime: string.isRequired
};
