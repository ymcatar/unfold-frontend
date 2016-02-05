import React from 'react';

import Colors from './Colors.jsx';
import Placeholder from './Placeholder.jsx';

import EventDetail from './EventDetail.jsx';

const classNames = {
	left: "col-xs-12 col-sm-8 col-md-8 col-lg-8",
	right: "hidden-xs col-sm-4 col-md-4, col-lg-4"
};

const styles = {
	main: {
		textColor: Colors.right.textColor
	},
	left: {
		backgroundColor: Colors.backgroundColor, 
		height: '100vh'
	},
	right: {
		backgroundColor: Colors.primary, 
		height: '100vh',
		padding: '30px 5vw 10px 4vw'
	},
	header: {
		color: Colors.right.header.textColor,
		fontWeight: '500',
		borderTop: `3px ${Colors.right.header.textColor} solid`,
		marginTop: '30px'
	}
};

const generateHeader = function(text) {
	return (
		<h5 style={styles.header}>
			{text}
		</h5>
	)
}

export default class ReaderView extends React.Component {
	render() {
		return (
			<div className="row" style={styles.main}> 
				<div className={classNames.left} style={styles.left}></div>
				<div className={classNames.right} style={styles.right}>
					<EventDetail
						title={Placeholder.event.title}
						description={Placeholder.event.description} />
					{generateHeader('CONTRIBUTORS')}
					<p>Wut!!?</p>
					{generateHeader('INFORMATION')}
				</div>
			</div>
		);
	}
}
