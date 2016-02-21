import React from 'react';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import MediaQuery from 'react-responsive';

import Logo from 'common/Logo.jsx';

import ReaderStream from 'left/ReaderStream.jsx';

import Timeline from 'mid/Timeline.jsx';

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
	mid: {
		backgroundColor: Colors.mid.backgroundColor,
		width: '70px',
		minWidth: '70px',
		height: '100vh',
		overflowY: 'scroll'
	},
	right: {
		backgroundColor: Colors.right.backgroundColor,
		color: Colors.right.color,
		height: '100vh',
		minWidth: '350px',
		width: '320px',
		padding: '20px',
		boxShadow: Colors.zDepth
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

		let mid = (
			<div style={styles.mid}>
				<Timeline data={Placeholder.readerStream}/>
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

		const generateBody = (showLeft, showMid, showRight, leftSmall) => {
			let l = showLeft? left(leftSmall): null;
			let m = showMid? mid: null;
			let r = showRight? right: null;
			return (
				<div style={styles.main}>
					{l}
					{m}
					{r}
				</div>
			);
		};

		return (
			<div>
				<MediaQuery minDeviceWidth={1224}>
					<MediaQuery minWidth={1000}>
						{generateBody(true, true, true, true)}
					</MediaQuery>
					<MediaQuery minWidth={800} maxWidth={1000}>
						{generateBody(true, true, true, true)}
					</MediaQuery>
					<MediaQuery maxWidth={800}>
						{generateBody(true, false, false, false)}
					</MediaQuery>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={1224}>
					{generateBody(true, false, false, false)}
				</MediaQuery>
			</div>
		);
	}
}
