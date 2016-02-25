import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import SweetScroll from 'sweet-scroll';

import Colors from 'config/Colors.jsx';
import Placeholder from 'config/Placeholder.jsx';

import ReaderHeader from 'header/ReaderHeader.jsx';
import ReaderStream from 'stream/ReaderStream.jsx';
import Timeline from 'timeline/Timeline.jsx';
import ReaderInfo from 'info/ReaderInfo.jsx';

const styles = {
	editor: {
		width: '50%',
		height: '100vh',
		backgroundColor: 'red'
	},
	main: {
		textColor: Colors.info.textColor,
		paddingTop: '50px',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflowX: 'hidden'
	},
	stream: {
		backgroundColor: Colors.stream.backgroundColor,
		height: '100vh',
		width: '50%',
		padding: '10px',
		paddingBottom: '50px',
		overflowY: 'scroll',
		overflowX: 'hidden'
	},
	timeline: {
		backgroundColor: Colors.timeline.backgroundColor,
		width: '70px',
		minWidth: '70px',
		height: '100vh',
		overflowY: 'scroll',
		overflowX: 'hidden'
	},
	info: {
		backgroundColor: Colors.info.backgroundColor,
		color: Colors.info.color,
		height: '100vh',
		minWidth: '300px',
		width: '300px',
		padding: '20px',
		overflowY: 'scroll',
		overflowX: 'hidden',
		boxShadow: Colors.zDepth,
		zIndex: 3
	}
};

export default class ContributorHeader extends React.Component {

	constructor(props) {
		super(props);
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

			let editorComponent = (
				<div style={styles.editor}>
				</div>
			);

			let streamComponent = small => (
				<div style={styles.stream} id="left">
					<ReaderStream
						header={this.state.filter}
						small={small}
						data={this.getFilteredStream()}
						handleFilter={this.handleFilter}
						contributors={Placeholder.contributors} />
				</div>
			);

			let timelineComponent = (
				<div style={styles.timeline}>
					<Timeline data={this.getFilteredStream()}/>
				</div>
			);

			let infoComponent = (
				<div style={styles.info}>
					<ReaderInfo data={Placeholder} />
				</div>
			);

			let editorDiv = editorComponent;
			let streamDiv = stream? streamComponent(noAvatar): null;
			let timelineDiv = timeline? timelineComponent: null;
			let infoDiv = info? infoComponent: null;

			return (
				<div>
					<ReaderHeader
						filter={this.state.filter}
						handleFilter={this.handleFilter}/>
					<div style={styles.main}>
						{editorDiv}
						{streamDiv}
						{timelineDiv}
						{infoDiv}
					</div>
				</div>
			);
		};

		return (
			<div>
				{generateBody(true, true, true, true)}
			</div>
		);
    }
}
