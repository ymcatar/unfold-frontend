import React from 'react';
import {Image, OverlayTrigger, Popover} from 'react-bootstrap';

import uuid from 'node-uuid';

import Colors from 'config/Colors.jsx';

const getImageStyle = function(size = 55, on = false) {
	let {online, offline} = Colors.avatar;
	return {
		width: `${size}px`,
		height: `${size}px`,
		border: `5px ${on? online: offline} solid`,
		padding: '3px'
	};
};

export default class Avatar extends React.Component {
	render() {
		return (
			<div style={this.props.style}>
				<OverlayTrigger
					trigger={["hover", "focus"]}
					placement="bottom"
					overlay={
						<Popover
							className="popover"
							id={uuid.v1()} >
							<b style={{marginRight: '10px'}}>
								{this.props.name}
							</b>
							{this.props.title}
						</Popover>
					}>
					<Image
						style={getImageStyle(this.props.size, this.props.online)}
						src={this.props.image}
						circle />
				</OverlayTrigger>
			</div>
		);
	}
}
