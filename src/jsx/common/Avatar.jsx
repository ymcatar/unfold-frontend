import React from 'react';
import {Image, OverlayTrigger, Popover} from 'react-bootstrap';

import Colors from 'config/Colors.jsx';

const getImageStyle = function(size = 50, on = false) {
	let {online, offline} = Colors.common.avatar;
	return {
		width: `${size}px`,
		height: `${size}px`,
		border: `3px ${on? online: offline} solid`
	};
};  

export default class Avatar extends React.Component {
	render() {
		return (
			<div>
				<OverlayTrigger
					trigger="hover"
					placement="bottom"
					overlay={<Popover title={this.props.name}>{this.props.title}</Popover>}>
					<Image
						style={getImageStyle(this.props.size, this.props.online)}
						src={this.props.image}
						circle />
				</OverlayTrigger>
			</div>
		);
	}
};
