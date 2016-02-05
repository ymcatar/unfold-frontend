import React from 'react';

import Colors from './Colors.jsx';

const style = {
	main: {
		color: Colors.right.textColor
	},
	h1: {
		marginBottom: '20px'
	},
	h2: {
		textAlign: 'justify',
		textJustify: 'inter-word'
	}
}

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
