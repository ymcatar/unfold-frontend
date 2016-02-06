import React from 'react';

const styles = {
	img: {
		height: '80px',
		margin: '10px 0px 10px 20px'
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
