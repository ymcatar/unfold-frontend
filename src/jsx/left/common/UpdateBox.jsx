import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import moment from 'moment';
import MediaQuery from 'react-responsive';

import Colors from 'config/Colors.jsx';

import UpdateAvatar from 'left/common/UpdateAvatar.jsx';
import Tags from 'left/common/Tags.jsx';

import TypeText from 'left/common/TypeText.jsx';

const styles = {
	main: {
		width: '100%',
		display: 'flex',
		marginTop: '20px',
		marginBottom: '20px'
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
		height: '25px'
	},
	content: {
	}
};

export default class UpdateBox extends React.Component {
	render() {
		const {name, title, image, online} = this.props.contributor;
		const date = moment(this.props.submitTime);

		let content;
		switch(this.props.type) {
			case 'text':
				content = (<TypeText data={this.props.content}/>);
				break;
		}

		return (
			<div style={styles.main}>
				<MediaQuery query='(min-width: 500px)'>
					<div style={styles.avatar}>
						<UpdateAvatar
							name={name}
							title={title}
							image={image}
							online={online}
							size="50" />
					</div>
				</MediaQuery>
				<div style={styles.card}>
					<div style={styles.info}>
						<MediaQuery query='(min-width: 500px)'>
							<h5 className="pull-left">
								{this.props.contributor.name}
							</h5>
						</MediaQuery>
						<h5 className="pull-right">
							{date.format('llll')}
						</h5>
					</div>
					<div style={styles.content}>
						{content}
					</div>
					<div>
						<Tags data={this.props.tags} />
					</div>
				</div>
			</div>
		);
	}
}
