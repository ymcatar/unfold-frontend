import React from 'react';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import ContributorEditor from 'editor/ContributorEditor.jsx';

const styles = {
	editor: {
		width: '50%',
		height: '30vh',
	},
	main: {
		textColor: Colors.info.textColor,
		paddingTop: '50px',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflowX: 'hidden',
		backgroundColor: Colors.stream.backgroundColor,
		height: '100vh'
	}
};

export default class ContributorHeader extends React.Component {

	render() {
		return (
			<div style={styles.main}>
				<div style={styles.editor}>
					<ContributorEditor />
				</div>
			</div>
		);
	}
}
