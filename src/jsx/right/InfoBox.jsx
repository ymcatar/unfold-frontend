import React from 'react';

import Colors from 'config/Colors.jsx';

const styles = {
	main: {
		overflowY: 'scroll',
		height: '20vh'
	},
	p: {
		textAlign: 'justify',
		textJustify: 'inter-word',
	}
};

export default class InfoBox extends React.Component {
	render() {
		return (
			<div style={styles.main}>
				<p style={styles.p}>{this.props.text}</p>
			</div>
		);
	}
}
