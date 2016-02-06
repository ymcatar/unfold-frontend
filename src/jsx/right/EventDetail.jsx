import React from 'react';

import Colors from 'config/Colors.jsx';

const style = {
	h1: {
		marginBottom: '20px',
		color: Colors.right.eventDetail.title,
		fontWeight: '700'
	},
	h2: {
		textAlign: 'justify',
		textJustify: 'inter-word',
		color: Colors.right.eventDetail.description,
	}
};

export default class EventDetail extends React.Component {
	render() {
		return(
			<div style={style.main}>
				<h1 style={style.h1}>
					{this.props.title}
				</h1>
				<p style={style.h2}>{this.props.description}</p>
			</div>
		);
	}
}