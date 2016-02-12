import React from 'react';
import {Row, Col} from 'react-bootstrap';

import uuid from 'node-uuid';

import Avatar from 'right/common/Avatar.jsx';

const generateAvatar = function(user, count) {
	let {name, title, image, online} = user;
	const styles = { margin: '0px 0px 10px 0px' };
	return (
		<Avatar
			key={uuid.v1()}
			style={styles}
			name={name}
			title={title}
			image={image}
			online={online} />
	);
};

export default class AvatarList extends React.Component {
	render() {
		let avatars = this.props.data.map((user, i) => (
			<Col xs={4} sm={4} md={3} lg={3} key={uuid.v1()}>
				{generateAvatar(user)}
			</Col>
		));
		return (
			<Row>
				{avatars}
			</Row>
		);
	}
}
