import React from 'react';
import Colors from 'config/Colors.jsx';

const styles = {
	main: {
		marginBottom: '20px'
	},
	h1: {
		marginBottom: '20px',
		color: Colors.right.eventDetail.title,
		fontWeight: '700'
	},
	h2: {
		color: Colors.right.eventDetail.description,
	}
};

export default class EventDetail extends React.Component {
	render() {
		return(
			<div style={styles.main}>
				<h2 style={styles.h1}>
					{this.props.title}
				</h2>
				<p style={styles.h2}>{this.props.description}</p>
			</div>
		);
	}
}
