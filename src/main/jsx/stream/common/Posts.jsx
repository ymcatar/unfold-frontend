import React from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';

import UpdateBox from './UpdateBox.jsx';

import { Stream as Colors } from 'config/colors';

const styles = {
    marker: {
        width: '100%',
        padding: '30px 0 10px 20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        fontSize: '30px',
        fontWeight: 'lighter',
        color: Colors.header
    }
};

export default class Posts extends React.Component {

    shouldComponentUpdate(nextProps) {
        let curr = this.props.data;
        let next = nextProps.data;

        if (!curr && next || next && curr.length !== next.length)
            return true;
        else
            return false;
    }

    render() {
        if (!this.props.data)
            return null;

        let lastTime;
        let elements = this.props.data.map(post => {
            let marker;
            if (this.props.marker) {
                let currentTime = moment(post.createdAt).format("DD/MM, ha");
                if (lastTime != currentTime || !lastTime)
                    marker = (
                        <p style={styles.marker} id={moment(post.createdAt).format("DD_MM_YYYY_H")}>
                            {currentTime}
                        </p>
                    );
                lastTime = currentTime;
            }
            return (
                <div key={post.id}>
                    {marker}
                    <LazyLoad wheel={true} scroll={false} offset={2500}>
                        <UpdateBox data={post} role={this.props.role} />
                    </LazyLoad>
                </div>
            );
        });
        return (
            <div>{elements}</div>
        );
    }
}
