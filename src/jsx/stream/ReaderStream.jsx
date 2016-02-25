import React from 'react';
import _ from 'lodash';
import uuid from 'node-uuid';

import Colors from 'config/Colors.jsx';

import UpdateBox from './common/UpdateBox.jsx';
import LazyScroller from './common/LazyScroller.jsx';

const styles = {
	main: {
		width: '100%',
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
	constructor(props) {
		super(props);

		let data = props.data.sort((a, b) => {
			a = new Date(a.submitTime);
			b = new Date(b.submitTime);
			return b - a;
		});

		this.state = {
			position: {
				index: 0,
				offset: 0,
				scrollTop: 0
			},
			data: data,
			items: new Array(data.length),
			loading: new Array(data.length)
		};

		this.debouncedForceUpdate = _.debounce(this.forceUpdate.bind(this), 200,
											   {leading: true, maxWait: 200});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
		// return _.isEqual(nextProps, this.props) === false;
	}

	onPositionChange(position, layout) {
		this.setState({
			position: position
		});
		// HACK: we proudly mutate the state
		layout.forEach((attrs, i) => {
			if (this.state.loading[i])
				return;
			this.state.loading[i] = true;

			let props = {
				key: uuid.v1(),
				handleFilter: this.props.handleFilter,
				small: this.props.small,
				contributor: this.props.contributors.filter(user => user.id === this.state.data[i].contributor)[0],
				data: this.state.data[i]
			};

			UpdateBox.fetchProps(props)
				.then(data => {
					this.state.items[i] = (
						<UpdateBox key={i} {..._.extend(props, data)} />
					);
					this.debouncedForceUpdate();
				 });
		});
	}

	render() {
		return (
			<div style={styles.main} id="stream">
				<LazyScroller
					position={this.state.position}
					style={{width: '100%', height: 'calc(100vh - 50px)'}}
					onPositionChange={this.onPositionChange.bind(this)}>

					{[
						<h2 key="heading" style={styles.header} height={71}>
							#{this.props.header}
						</h2>
					].concat(this.state.items)}
				</LazyScroller>
			</div>
		);
	}
}
