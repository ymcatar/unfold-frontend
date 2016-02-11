import React from 'react';
import {Row, Col} from 'react-bootstrap';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import Logo from 'common/Logo.jsx';
import AvatarList from 'common/AvatarList.jsx';

import EventDetail from 'right/common/EventDetail.jsx';

import Information from 'right/reader/Information.jsx';
import Contributors from 'right/reader/Contributors.jsx';
import Translators from 'right/reader/Translators.jsx';

const styles = {
	main: {
		textColor: Colors.right.textColor,
		overflow: 'hidden'
	},
	left: {
		backgroundColor: Colors.left.backgroundColor,
		height: '100vh',
		padding: '30px'
	},
	right: {
		backgroundColor: Colors.right.backgroundColor,
		color: Colors.right.color,
		height: '100vh',
		padding: '30px 3vw 10px 2vw'
	}
};

export default class ReaderView extends React.Component {
	render() {
		return (
			<Row style={styles.main}>
				<Col xs={12} sm={8} md={8} lg={8} style={styles.left}>
					<Logo />
				</Col>
				<Col xsHidden={true} sm={4} md={4} lg={4} style={styles.right}>

					<EventDetail
						title={Placeholder.event.title}
						description={Placeholder.event.description} />

					<Information data={Placeholder.info} />

					<Contributors data={Placeholder.contributors} />
					<Translators data={Placeholder.translators} />

				</Col>
			</Row>
		);
	}
}
