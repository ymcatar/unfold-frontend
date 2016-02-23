import React from 'react';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import MediaQuery from 'react-responsive';

import ReaderTop from 'top/ReaderTop.jsx';

import ReaderStream from 'left/ReaderStream.jsx';

import Timeline from 'mid/Timeline.jsx';

import EventDetail from 'right/common/EventDetail.jsx';

import Information from 'right/reader/Information.jsx';
import Contributors from 'right/reader/Contributors.jsx';
import Translators from 'right/reader/Translators.jsx';

const styles = {
	main: {
		textColor: Colors.right.textColor,
		paddingTop: '50px',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	left: {
		backgroundColor: Colors.left.backgroundColor,
		height: '100vh',
		width: '100%',
		padding: '10px',
		paddingBottom: '50px',
		overflowY: 'scroll'
	},
	mid: {
		backgroundColor: Colors.mid.backgroundColor,
		width: '70px',
		minWidth: '70px',
		height: '100vh',
		overflowY: 'scroll'
	},
	right: {
		backgroundColor: Colors.right.backgroundColor,
		color: Colors.right.color,
		height: '100vh',
		minWidth: '300px',
		width: '300px',
		padding: '20px',
		overflowY: 'scroll',
		boxShadow: Colors.zDepth
	},
	filter: {
		paddingLeft: '20px',
		color: Colors.left.filter
	}
};

export default class ReaderView extends React.Component {

	constructor() {
		super();
		this.state = {filter: 'all'};
		this.handleFilter = this.handleFilter.bind(this);
		this.getFilteredStream = this.getFilteredStream.bind(this);
	}

	handleFilter(test) {
		console.log(test);
		this.setState({filter: test});
	}

	getFilteredStream() {
		if (this.state.filter === 'all')
			return Placeholder.readerStream;
		else
			return Placeholder.readerStream.filter(item => (
				item.tags && item.tags.indexOf(this.state.filter) >= 0
			));
	}

	render() {

		let left = small => (
			<div style={styles.left} id="left">
				<h2 style={styles.filter}>{'#' + this.state.filter}</h2>
				<ReaderStream
					small={small}
					data={this.getFilteredStream()}
					handleFilter={this.handleFilter}
					contributors={Placeholder.contributors} />
			</div>
		);

		let mid = (
			<div style={styles.mid}>
				<Timeline data={this.getFilteredStream()}/>
			</div>
		);

		let right = (
			<div style={styles.right}>
				<EventDetail
					title={Placeholder.event.title}
					description={Placeholder.event.description} />

				<Information data={Placeholder.info} />

				<Contributors data={Placeholder.contributors} />
				<Translators data={Placeholder.translators} />

			</div>
		);

		const generateBody = (showLeft, showMid, showRight, leftSmall) => {
			let l = showLeft? left(leftSmall): null;
			let m = showMid? mid: null;
			let r = showRight? right: null;
			return (
				<div>
					<ReaderTop
						filter={this.state.filter}
						handleFilter={this.handleFilter}/>
					<div style={styles.main}>
						{l}
						{m}
						{r}
					</div>
				</div>
			);
		};

		return (
			<div>
				<MediaQuery minDeviceWidth={1224}>
					<MediaQuery minWidth={1000}>
						{generateBody(true, true, true, true)}
					</MediaQuery>
					<MediaQuery minWidth={800} maxWidth={1000}>
						{generateBody(true, true, true, false)}
					</MediaQuery>
					<MediaQuery maxWidth={800}>
						{generateBody(true, false, false, false)}
					</MediaQuery>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={1224}>
					{generateBody(true, false, false, false)}
				</MediaQuery>
			</div>
		);
	}
}
