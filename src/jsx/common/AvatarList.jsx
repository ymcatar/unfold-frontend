import React from 'react';
import {Row, Col} from 'react-bootstrap';

import Avatar from 'common/Avatar.jsx';

const generateAvatar = function(user) {
	let {name, title, image, online} = user;

	const styles = {
		margin: '0px 0px 10px 0px'
	};

	return (
		<Avatar
			style={styles}
			name={name}
			title={title}
			image={image}
			online={online} />
	);
};

export default class AvatarList extends React.Component {
	render() {
		let avatars = this.props.users.map(user => (
			<Col xs={4} sm={4} md={3} lg={3}>
				{generateAvatar(user)}
			</Col>
		));
		return (
			<Row>
				{avatars}
			</Row>
		);
	}
};
