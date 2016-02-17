import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import UpdateAvatar from 'left/common/UpdateAvatar.jsx';
import Tags from 'left/common/Tags.jsx';

import TypeText from 'left/common/TypeText.jsx';
import TypeEmbed from 'left/common/TypeEmbed.jsx';
import TypeFacebook from 'left/common/TypeFacebook.jsx';

const styles = {
	main: {
		width: '700px',
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
				content = (<TypeText data={this.props.data.content}/>);
				break;
			case 'twitter':
			case 'reddit':
			case 'youtube':
			case 'flickr':
			case 'imgur':
				content = (<TypeEmbed data={this.props.data.content} src={this.props.data.source}/>);
				break;
			case 'facebook':
				content = (<TypeFacebook data={this.props.data.content} src={this.props.data.source}/>);
				break;
		}

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
			<div style={styles.main}>
				{avatar}
				<div style={styles.card}>
					<div style={styles.info}>
						<h5 className="pull-left">{this.props.contributor.name}</h5>
						<h5 className="pull-right">{date.format('llll')}</h5>
					</div>
					<div style={styles.content}>
						{content}
					</div>
					<div>
						<Tags data={this.props.data.tags} />
					</div>
				</div>
			</div>
		);
	}
}
