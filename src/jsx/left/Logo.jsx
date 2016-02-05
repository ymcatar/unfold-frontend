import React from 'react';

const styles = {
	img: {
		height: '80px',
		margin: '20px 0px 20px 0px'
	}
}

export default class Logo extends React.Component {
	render() {
		return (
			<div>
				<img src="res/logo.png" style={styles.img} />
			</div>
		);
	}
}
