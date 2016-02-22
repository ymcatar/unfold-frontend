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

const generateAvatar = function(user, count) {
	let {name, title, image, online} = user;
	const styles = { margin: '0px 10px 10px 0px' };
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
			<div key={uuid.v1()}>
				{generateAvatar(user)}
			</div>
		));
		return (
			<div style={styles.main}>
				{avatars}
			</div>
		);
	}
}
