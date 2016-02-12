import React from 'react';

const styles = {
	img: {
		height: '80px'
	}
};

export default class Logo extends React.Component {
	render() {
		return (
			<div>
				<img src="res/logo.png" style={styles.img} />
			</div>
		);
	}
}
