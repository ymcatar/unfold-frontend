import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import Colors from 'config/Colors.jsx';

import Card from 'common/Card.jsx';

import UpdateAvatar from './UpdateAvatar.jsx';
import Tags from './Tags.jsx';
import TypeText from './TypeText.jsx';
import TypeEmbed from './TypeEmbed.jsx';
import TypeTwitter from './TypeTwitter.jsx';
import TypeFacebook from './TypeFacebook.jsx';

const styles = {
	main: {
		width: '620px',
		maxWidth: '100%',
		display: 'flex',
		padding: '0 10px',
		margin: '10px auto'
	},
	avatar: {
		position: 'relative',
		left: '-10px',
		top: '5px',
		width: '60px'
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
	static fetchProps(someProps) {
		let promise;
		switch (someProps.data.type) {
			case 'text':
				promise = Promise.resolve({});
				break;
			case 'twitter':
				promise = TypeTwitter.fetchProps(someProps.data.source);
				break;
			case 'youtube':
			case 'flickr':
			case 'imgur':
				promise = TypeEmbed.fetchProps(someProps.data.source);
				break;
			case 'facebook':
				promise = TypeFacebook.fetchProps(someProps.data.source);
				break;
		}
		return promise.then(props => ({ embed: props }));
	}

    shouldComponentUpdate(nextProps) {
        return !_.isEqualWith(this.props, nextProps, (x, y) => x === y);
    }

	render() {
		if (!this.props.data) {
			// Placeholder
			let avatar = null;
			if (this.props.small)
				avatar = (<div style={styles.avatar} />);
			return (
				<div style={_.extend({}, styles.main, this.props.style)}>
					{avatar}
					<div style={styles.card} />
				</div>
			);
		}
		const {name, title, image, online} = this.props.contributor;
		const date = moment(this.props.data.submitTime);

		let content;
		switch(this.props.data.type) {
			case 'text':
				content = null;
				break;
			case 'twitter':
				content = (<TypeTwitter {...this.props.embed} onResize={this.props.onResize} />);
				break;
			case 'youtube':
			case 'flickr':
			case 'imgur':
				content = (<TypeEmbed {...this.props.embed} onResize={this.props.onResize} />);
				break;
			case 'facebook':
				content = (<TypeFacebook {...this.props.embed} onResize={this.props.onResize} />);
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

		let tags = this.props.data.tags && this.props.data.tags.length > 0? (
			<Tags data={this.props.data.tags} handleFilter={this.props.handleFilter} />
		): null;

		return (
			<div style={_.extend({}, styles.main, this.props.style)}>

				{avatar}
				<Card>
					<div style={styles.info}>
						<h5 className="pull-left">{this.props.contributor.name}</h5>
						<h5 className="pull-right">{date.format('llll')}</h5>
					</div>
					<div style={styles.content}>
						<TypeText data={this.props.data.content} />
						{content}
					</div>
					<div>
						{tags}
					</div>
				</Card>
			</div>
		);
	}
}
