import React from 'react';
import uuid from 'node-uuid';

import { Image, OverlayTrigger, Popover } from 'react-bootstrap';

import { Avatar as Colors } from 'config/colors';

const styles = {
    main: {
        margin: '0px 5px 5px 0px'
    },
    image: (size, on) => ({
        width: size,
        height: size,
        border: `5px ${on? Colors.online: Colors.offline} solid`,
        padding: 3
    }),
    blank: (size, on) => ({
        width: size,
        height: size,
        padding: 3,
        border: `5px ${on? Colors.online: Colors.offline} solid`,
        backgroundColor: '#808080',
        borderRadius: '50%'
    })
};

export default class Avatar extends React.Component {
    render() {

        let { size, style } = this.props;
        let { name, user } = this.props.user;
        let { description } = this.props.user.profile;
        let image = null;
        let online = true;

        const popover = (
            <Popover className="popover" id={uuid.v1()} >
                <b style={{marginRight: '10px'}}>{name}</b>
                {description}
            </Popover>
        );

        const avatar = image? (
            <Image style={styles.image(size, online)} src={image} circle />
        ): (
            <div style={styles.blank(size, online)} />
        );

        return (
            <div style={styles.main}>
                <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={popover}>
                {avatar}
                </OverlayTrigger>
            </div>
        );
    }
}

Avatar.defaultProps = {
    size: 55
};
