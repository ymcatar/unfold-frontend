import React from 'react';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import Logo from 'common/Logo.jsx';
import Avatar from 'common/Avatar.jsx';

import EventDetail from 'right/EventDetail.jsx';
import InfoBox from 'right/InfoBox.jsx';

import {Row, Col, Image} from 'react-bootstrap';

const styles = {
	main: {
		textColor: Colors.right.textColor
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
		padding: '30px 5vw 10px 4vw',
	},
	header: {
		fontWeight: '700',
		marginTop: '30px',
		marginBottom: '30px',
		color: Colors.right.header.color,
		borderTop: '2px ${Colors.right.header.color} solid'
	}
};

const generateHeader = function(text) {
	return (
		<h5 style={styles.header}>
			{text}
		</h5>
	)
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
					{generateHeader('CONTRIBUTORS')}

					<Avatar image='res/avatar.jpg' name='DuARTe' title='Our Lord' online={true} />

					{generateHeader('INFORMATION')}
					<InfoBox />
				</Col>
			</Row>
		);
	}
}
