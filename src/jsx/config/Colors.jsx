const colors = {
	primary900: '#019EC3',
	primary800: '#04BFEB',
	white: 'white',
	white100: 'rgba(255, 255, 255, 0.9)',
	white200: 'rgba(255, 255, 255, 0.8)'
};

export default {
	common: {
		avatar: {
			name: colors.white,
			title: colors.white,
			online: '#9CF924',
			offline: '#27C0E4'
		}
	},
	right: {
		backgroundColor: colors.primary900, 
		color: colors.white100,
		eventDetail: {
			title: colors.white,
			description: colors.white200
		},
		header: {
			color: colors.white
		}
	},
	left: {
		backgroundColor: '#EEEEEE' 
	},
	zDepth: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
}
