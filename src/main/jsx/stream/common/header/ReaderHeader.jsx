import React from 'react';
import moment from 'moment';

import { Image } from 'react-bootstrap';

const styles = {
    avatar: {
        width: '48px',
        height: '48px',
        backgroundColor: 'grey' // placeholder for now
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

export default class ReaderHeader extends React.Component {
    render() {
        const {name, title, image, online} = this.props.author;
        const date = moment(this.props.time);
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
