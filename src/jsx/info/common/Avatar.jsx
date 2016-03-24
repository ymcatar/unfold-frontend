import React from 'react';
import uuid from 'node-uuid';

import { Image, OverlayTrigger, Popover } from 'react-bootstrap';

import { Avatar as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        margin: '0px 10px 10px 0px'
    }
};

const getImageStyle = (size, on) => ({
    width: size,
    height: size,
    border: `5px ${on? Colors.online: Colors.offline} solid`,
    padding: 3
});

export default class Avatar extends React.Component {
    render() {

        let {name, description, size, online, image, style} = this.props;

        const popover = (
            <Popover className="popover" id={uuid.v1()} >
                <b style={{marginRight: '10px'}}>{name}</b>
                {description}
            </Popover>
        );

        return (
            <div style={styles.main}>
                <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={popover}>
                    <Image style={getImageStyle(size, online)} src={image} circle />
                </OverlayTrigger>
            </div>
        );
    }
}

let { string, number, bool, object } = React.PropTypes;

Avatar.propTypes = {
    name: string.isRequired,
    description: string.isRequired,
    size: number.isRequired,
    image: string.isRequired,
    online: bool.isRequired,
    style: object
};

Avatar.defaultProps = {
    size: 55,
    online: false
};
