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
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	left: {
		backgroundColor: Colors.left.backgroundColor,
		height: '100vh',
		width: '100%',
		padding: '10px',
		overflowY: 'scroll'
	},
	right: {
		backgroundColor: Colors.right.backgroundColor,
		color: Colors.right.color,
		height: '100vh',
		width: '400px',
		padding: '30px'
	}
};

export default class ReaderView extends React.Component {
	render() {

		let left = small => (
			<div style={styles.left}>
				<ReaderStream
					small={small}
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
				<MediaQuery minDeviceWidth={1224}>
					<MediaQuery minWidth={800}>
						<div style={styles.main}>
							{left(true)}
							{right}
						</div>
					</MediaQuery>
					<MediaQuery maxWidth={800}>
						<div style={styles.main}>
							{left(false)}
						</div>
					</MediaQuery>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={1224}>
					<div style={styles.main}>
						{left}
					</div>
				</MediaQuery>
			</div>
		);
	}
}
