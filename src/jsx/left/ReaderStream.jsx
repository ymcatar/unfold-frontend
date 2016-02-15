import React from 'react';
import _ from 'lodash';
import uuid from 'node-uuid';

import UpdateBox from 'left/common/UpdateBox.jsx';

const styles = {
	main: {
		width: '100%'
	}
};

export default class ReaderStream extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps, this.props);
        return _.equal(nextProps, this.props);
    }

	render() {
		let contents = this.props.data.map(item => (
			<UpdateBox
				key={uuid.v1()}
				contributor={this.props.contributors.filter(user => user.id === item.contributor)[0]}
				data={item} />
		));
		return (
			<div className="container-fluid" style={styles.main}>
				{contents}
			</div>
		);
	}
}
