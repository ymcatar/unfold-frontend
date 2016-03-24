import React from 'react';

import uuid from 'node-uuid';

import Avatar from './Avatar.jsx';

const styles = {
    main: {
        display: 'flex',
        width: '100%',
        flexFlow: 'row wrap',
        alignContent: 'flex-start'
    }
};

const generateAvatar = (user, count) => (
    <Avatar key={uuid.v1()} {... user} />
);

export default class AvatarList extends React.Component {
    render() {
        return (
            <div style={styles.main}>
                {this.props.data.map(user => (
                    <div key={uuid.v1()}>{generateAvatar(user)}</div>
                ))}
            </div>
        );
    }
}

let { arrayOf, shape, string, bool } = React.PropTypes;

AvatarList.propTypes = {
    data: arrayOf(
        shape({
            name: string.isRequired,
            description: string.isRequired,
            image: string.isRequired
        }))
};

AvatarList.defaultProps = {
    data: []
};
