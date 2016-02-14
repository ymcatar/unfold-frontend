export default {
	event: {
		title: "Umbrella Revolution",
		description: 'The Umbrella Movement is a loose pro-democracy political movement that was created spontaneously during the Hong Kong protests of 2014.'
	},
	info: "We are currently inviting some more contributors for the live stream. If you are interested, feel free to send a message to one of our contributors!\n",
	contributors: [
		{
			id: '01',
			name: 'Bernie Sandwiches',
			title: 'Our Lord',
			image: 'res/avatar.jpg',
			online: true
		},
		{
			id: '02',
			name: 'Lord DuARTe',
			title: 'Savior',
			image: 'res/avatar2.jpg',
			online: true
		},
		{
			id: '03',
			name: 'Donald Dump',
			title: 'This is a pretty long description of whatever this is talking about. This is a pretty long description of whatever this is talking about. This is a pretty long description of whatever this is talking about. This is a pretty long description of whatever this is talking about.',
			image: 'res/avatar3.jpg',
			online: false
		},
	],
	translators: [
		{
			name: 'Matias',
			title: 'Savior',
			image: 'res/avatar2.jpg',
			online: false
		}
	],
	readerStream: [
		{
			type: 'text',
			contributor: '01',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			submitTime: '2016-02-12T03:21:55Z',
			tags: ['important']
		},
		{
			type: 'text',
			contributor: '02',
			content: 'Praesent metus orci, suscipit ac condimentum a, facilisis finibus ex.',
			submitTime: '2016-02-12T08:21:55Z',
			tags: ['reliable', 'important']
		},
		{
			type: 'text',
			contributor: '01',
			content: 'Integer nisl est, sagittis eget lacus at, maximus suscipit dolor. Integer a laoreet nisi. Nulla finibus metus nec nisl ultricies, vel pulvinar erat efficitur. Mauris viverra pharetra neque, sed ornare nulla sollicitudin non. In convallis efficitur est quis mattis. Donec iaculis velit sed neque pharetra, nec fringilla mauris pretium. Proin lacinia auctor dolor nec tempor. Aliquam eleifend cursus consectetur. Fusce ex ante, imperdiet ut enim in, condimentum tempus velit.',
			submitTime: '2016-02-12T08:21:55Z',
			tags: []
		}
	]
};
