import React from 'react';
import {Image} from 'react-bootstrap';

import Colors from 'config/Colors.jsx';

const getImageStyle = function(size = 55, on = false) {
    return {
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: Colors.zDepth
    };
};


export default class Avatar extends React.Component {
    render() {
        return (
            <Image
                style={getImageStyle(this.props.size, this.props.online)}
                src={this.props.image}
                circle />
        );
    }
}
