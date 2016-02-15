import React from 'react';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import MediaQuery from 'react-responsive';

import Logo from 'common/Logo.jsx';

import ReaderStream from 'left/ReaderStream.jsx';

import EventDetail from 'right/common/EventDetail.jsx';

import Information from 'right/reader/Information.jsx';
import Contributors from 'right/reader/Contributors.jsx';
import Translators from 'right/reader/Translators.jsx';

const styles = {
	main: {
		textColor: Colors.right.textColor,
		overflow: 'hidden',
		display: 'flex'
	},
	left: {
		backgroundColor: Colors.left.backgroundColor,
		height: '100vh',
		width: '100%',
		padding: '20px',
		overflowY: 'scroll'
	},
	right: {
		backgroundColor: Colors.right.backgroundColor,
		color: Colors.right.color,
		height: '100vh',
		width: '500px',
		padding: '30px'
	}
};

export default class ReaderView extends React.Component {
	render() {

		let left = (
			<div style={styles.left}>
				<ReaderStream
					data={Placeholder.readerStream}
					contributors={Placeholder.contributors} />
			</div>
		);

		let right = (
			<div style={styles.right}>
				<Logo />
				<EventDetail
					title={Placeholder.event.title}
					description={Placeholder.event.description} />

				<Information data={Placeholder.info} />

				<Contributors data={Placeholder.contributors} />
				<Translators data={Placeholder.translators} />

			</div>
		);

		return (
			<div>
				<MediaQuery query='(min-width: 780px)'>
					<div style={styles.main}>
						{left}
						{right}
					</div>
				</MediaQuery>
				<MediaQuery query='(max-width: 780px)'>
					<div style={styles.main}>
						{left}
					</div>
				</MediaQuery>
			</div>
		);
	}
}
