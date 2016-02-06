import React from 'react';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import Logo from 'left/Logo.jsx';
import EventDetail from 'right/EventDetail.jsx';

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
		padding: '30px 5vw 10px 4vw'
	},
	header: {
		fontWeight: '700',
		marginTop: '30px',
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

const generateContributor = function(avatar, name, title) {
	const styles = {
		image: {
			width: '50px',
			height: '50px'
		},
		text: {
			margin: '5px',
			marginLeft: '20px'
		},
		main: {
			marginTop: '5px'
		}
	};
	return (
		<Row style={styles.main}>
			<Col xs={2} sm={2} md={2} lg={2}>
				<Image style={styles.image} src={avatar} circle />
			</Col>
			<Col xs={10} sm={10} md={10} lg={10}>
				<h4 className="text-left" style={styles.text}>{name}</h4>
				<h5 className="text-left" style={styles.text}>{title}</h5>
			</Col>
		</Row>
	);
};

export default class ReaderView extends React.Component {
	render() {
		return (
			<Row style={styles.main}> 
				<Col xs={12} sm={8} md={8} lg={8} style={styles.left}>
				</Col>
				<Col xsHidden={true} sm={4} md={4} lg={4} style={styles.right}>
					<Logo />
					<EventDetail
						title={Placeholder.event.title}
						description={Placeholder.event.description} />
					{generateHeader('CONTRIBUTORS')}

					{generateContributor('res/avatar.jpg', 'DuARTe', 'Our Lord')}
					{generateContributor('res/avatar.jpg', 'Matias', 'It just works!')}

					{generateHeader('INFORMATION')}
				</Col>
			</Row>
		);
	}
}
