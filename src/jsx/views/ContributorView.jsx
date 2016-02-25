import React from 'react';
import Placeholder from 'config/Placeholder.jsx';
import Colors from 'config/Colors.jsx';

import ContributorEditor from 'editor/ContributorEditor.jsx';

const styles = {
	main: {
		textColor: Colors.info.textColor,
		paddingTop: '50px',
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		overflowX: 'hidden',
		backgroundColor: Colors.stream.backgroundColor,
		height: '100vh'
	},
	left: {
		width: '500px'
	}
};

export default class ContributorHeader extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(input) {
		console.log(input);
	}

	render() {
		return (
			<div style={styles.main}>
				<div style={styles.left}>
					<ContributorEditor handleSubmit={this.handleSubmit} />
				</div>
			</div>
		);
	}
}
