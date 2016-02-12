import React from 'react';
import markdown from 'common/Markdown.js';

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
			<div
				dangerouslySetInnerHTML={{__html: markdown(this.props.data)}} />
		);
	}
}
