import React from 'react';
import Placeholder from 'config/Placeholder.jsx';
import Colors from 'config/Colors.jsx';

import ReaderStream from 'stream/ReaderStream.jsx';

import ContributorHeader from 'header/ContributorHeader.jsx';

import ContributorEditor from 'editor/ContributorEditor.jsx';

const styles = {
	main: {
		textColor: Colors.info.textColor,
		overflow: 'hidden',
		display: 'flex',
		justifyContent: 'center',
		overflowX: 'hidden',
		backgroundColor: Colors.stream.backgroundColor,
		height: '100vh'
	},
	editor: {
		width: '600px',
		padding: '20px',
		paddingTop: '70px'
	},
	stream: {
		backgroundColor: Colors.stream.backgroundColor,
		height: '100vh',
		width: '100%',
		paddingBottom: '50px'
	}
};

export default class ContributorView extends React.Component {

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
				<ContributorHeader />

				<div style={styles.editor}>
					<ContributorEditor handleSubmit={this.handleSubmit} />
				</div>

				<div style={styles.stream} id="left">

				</div>
			</div>
		);
	}
}
