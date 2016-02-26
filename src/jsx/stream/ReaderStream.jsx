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
        width: '200px',
		color: Colors.stream.header,
		borderBottom: `3px ${Colors.stream.headerBorder} solid`,
		padding: '0 10px 5px 10px',
		marginLeft: 'auto',
		marginRight: 'auto',
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
				offset: 0
			},
			data: data,
			items: new Array(data.length),
			loading: new Array(data.length)
		};
		this.debouncedForceUpdate = this.forceUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			let data = nextProps.data.sort((a, b) => {
				a = new Date(a.submitTime);
				b = new Date(b.submitTime);
				return b - a;
			});
			this.setState({
				position: {
					index: 0,
					offset: 0,
					force: true
				},
				data: data,
				items: new Array(data.length),
				loading: new Array(data.length)
			});
		}
	}

	onPositionChange(position, layout) {
		this.setState({
			position: position
		});
		// HACK: we proudly mutate the state
		layout.forEach((attrs, i) => {
			i -= 1;
			if (i < 0)
				return;
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

	createPlaceholder(key, height) {
		return (
			<UpdateBox
				key={key}
				style={{height: height - 20}}
				small={this.props.small} />
		);
	}

	scrollTo(date) {
		let index = _.findIndex(this.state.data, x => new Date(x.submitTime) - date < 0);
		if (index === -1)
			throw new Error('invalid date');

		this.setState({
			position: {
				index: index,
				offset: 0,
				force: true
			}
		});
	}

	render() {
		return (
			<div style={styles.main} id="stream">
				<LazyScroller
					position={this.state.position}
					style={{width: '100%', height: 'calc(100vh - 50px)'}}
					onPositionChange={this.onPositionChange.bind(this)}
					placeholderFunc={this.createPlaceholder.bind(this)}>
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
