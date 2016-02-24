import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import LazyLoad from 'react-lazy-load';

import Colors from 'config/Colors.jsx';

import UpdateAvatar from './UpdateAvatar.jsx';
import Tags from './Tags.jsx';

import TypeText from './TypeText.jsx';
import TypeEmbed from './TypeEmbed.jsx';
import TypeTwitter from './TypeTwitter.jsx';
import TypeFacebook from './TypeFacebook.jsx';

const styles = {
	main: {
		width: '600px',
		maxWidth: '100%',
		display: 'flex',
		margin: '10px'
	},
	avatar: {
		position: 'relative',
		left: '-10px',
		top: '5px'
	},
	card: {
		width: '100%',
		maxWidth: '100%',
		backgroundColor: 'white',
		boxShadow: Colors.zDepth,
		border: '3px #FFFFFF solid',
		borderRadius: '2px',
		padding: '10px'
	},
	info: {
		color: 'grey',
		height: '25px',
		marginBottom: '20px'
	},
	content: {
		minWidth: '75%',
		maxWidth: '550px',
		margin: '10px 0px 10px 0px'
	}
};

export default class UpdateBox extends React.Component {
	render() {
		const {name, title, image, online} = this.props.contributor;
		const date = moment(this.props.data.submitTime);

		let content;
		switch(this.props.data.type) {
			case 'text':
				content = null;
				break;
			case 'twitter':
				content = (<TypeTwitter src={this.props.data.source} />);
				break;
			case 'youtube':
			case 'flickr':
			case 'imgur':
				content = (<TypeEmbed src={this.props.data.source}/>);
				break;
			case 'facebook':
				content = (<TypeFacebook src={this.props.data.source}/>);
				break;
		}

		if (content)
			content = (
				<LazyLoad offsetTop={1000} offsetBottom={1000} offsetHorizontal={0}>
					{content}
				</LazyLoad>
			);

		let avatar;
		if (this.props.small)
			avatar = (
				<div style={styles.avatar}>
					<UpdateAvatar
						name={name}
						title={title}
						image={image}
						online={online}
						size="50" />
				</div>
			);

		return (
			<div style={styles.main} className={`update_${date.format('YYYYMMDDH')}`}>
				{avatar}
				<div style={styles.card}>
					<div style={styles.info}>
						<h5 className="pull-left">{this.props.contributor.name}</h5>
						<h5 className="pull-right">{date.format('llll')}</h5>
					</div>
					<div style={styles.content}>
						<TypeText data={this.props.data.content} />
						{content}
					</div>
					<div>
						<Tags
							data={this.props.data.tags} handleFilter={this.props.handleFilter} />
					</div>
				</div>
			</div>
		);
	}
}