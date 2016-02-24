import React from 'react';
import _ from 'lodash';
import uuid from 'node-uuid';

import Colors from 'config/Colors.jsx';

import UpdateBox from './common/UpdateBox.jsx';

const styles = {
	main: {
		width: '100%',
		padding: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	header: {
		color: Colors.stream.header,
		borderBottom: `3px ${Colors.stream.headerBorder} solid`,
		padding: '0 10px 5px 10px',
		textAlign: 'center'
	}
};

export default class ReaderStream extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
        return _.isEqual(nextProps, this.props) === false;
    }

	render() {
		let data = this.props.data.sort((a, b) => {
			a = new Date(a.submitTime);
			b = new Date(b.submitTime);
			return b - a;
		});
		let contents = data.map(item => (
			<UpdateBox
				key={uuid.v1()}
				handleFilter={this.props.handleFilter}
				small={this.props.small}
				contributor={this.props.contributors.filter(user => user.id === item.contributor)[0]}
				data={item} />
		));
		return (
			<div style={styles.main} id="stream">
				<h2 style={styles.header}>#{this.props.header}</h2>
				{contents}
			</div>
		);
	}
}
