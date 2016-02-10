import React from 'react';
import marked from 'marked';

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
				dangerouslySetInnerHTML={{__html: marked(this.props.data)}} />
		);
	}
}
