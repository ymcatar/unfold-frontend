import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import ReaderHeader from 'header/ReaderHeader.jsx';

import ReaderStream from 'stream/ReaderStream.jsx';

import Timeline from 'timeline/Timeline.jsx';

import ReaderInfo from 'info/ReaderInfo.jsx';

const styles = {
	main: {
		textColor: Colors.info.textColor,
		paddingTop: '50px',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	left: {
		backgroundColor: Colors.stream.backgroundColor,
		height: '100vh',
		width: '100%',
		padding: '10px',
		paddingBottom: '50px',
		overflowY: 'scroll'
	},
	mid: {
		backgroundColor: Colors.timeline.backgroundColor,
		width: '70px',
		minWidth: '70px',
		height: '100vh',
		overflowY: 'scroll'
	},
	right: {
		backgroundColor: Colors.info.backgroundColor,
		color: Colors.info.color,
		height: '100vh',
		minWidth: '300px',
		width: '300px',
		padding: '20px',
		overflowY: 'scroll',
		boxShadow: Colors.zDepth,
		zIndex: 3
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
		const generateBody = (stream, timeline, info, noAvatar) => {
			let streamComponent = small => (
				<div style={styles.left} id="left">
					<ReaderStream
						header={this.state.filter}
						small={small}
						data={this.getFilteredStream()}
						handleFilter={this.handleFilter}
						contributors={Placeholder.contributors} />
				</div>
			);

			let timelineComponent = (
				<div style={styles.mid}>
					<Timeline data={this.getFilteredStream()}/>
				</div>
			);

			let infoComponent = (
				<div style={styles.right}>
					<ReaderInfo data={Placeholder} />
				</div>
			);

			let l = stream? streamComponent(noAvatar): null;
			let m = timeline? timelineComponent: null;
			let r = info? infoComponent: null;
			return (
				<div>
					<ReaderHeader
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
						{generateBody(true, true, false, false)}
					</MediaQuery>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={1224}>
					{generateBody(true, false, false, false)}
				</MediaQuery>
			</div>
		);
	}
}
