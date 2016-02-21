import React from 'react';
import _ from 'lodash';
import uuid from 'node-uuid';

import UpdateBox from 'left/common/UpdateBox.jsx';

const styles = {
	main: {
		width: '100%',
		padding: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
};

export default class ReaderStream extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
        return !_.equal(nextProps, this.props);
    }

	render() {
		let contents = this.props.data.map(item => (
			<UpdateBox
				key={uuid.v1()}
				small={this.props.small}
				contributor={this.props.contributors.filter(user => user.id === item.contributor)[0]}
				data={item} />
		));
		return (
			<div style={styles.main}>
				{contents}
			</div>
		);
	}
}
