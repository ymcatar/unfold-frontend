const colors = {
	primary900: '#019EC3',
	primary800: '#04BFEB',
	white: 'white',
	white100: 'rgba(255, 255, 255, 0.9)',
	white200: 'rgba(255, 255, 255, 0.8)'
};

export default {
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
