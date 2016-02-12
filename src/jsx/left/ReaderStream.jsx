import React from 'react';

import uuid from 'node-uuid';

import UpdateBox from 'left/common/UpdateBox.jsx';

const styles = {
	main: {
		width: '100%'
	}
};

export default class ReaderStream extends React.Component {
	render() {
		let contents = this.props.data.map(item => (
			<UpdateBox
				key={uuid.v1()}
				type={item.type}
				tags={item.tags}
				contributor={
					this.props.contributors.filter(user => user.id === item.contributor)[0]
				}
				submitTime={item.submitTime}
				content={item.content} />
		));
		return (
			<div className="container-fluid" style={styles.main}>
				{contents}
			</div>
		);
	}
}
