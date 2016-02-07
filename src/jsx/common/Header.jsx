import React from 'react';
import Colors from 'config/Colors.jsx';

const styles = {
    main: {
    	fontWeight: '600',
    	marginTop: '30px',
    	marginBottom: '30px',
    	color: Colors.right.header.color,
    	borderTop: '2px ${Colors.right.header.color} solid'
    }
};

export default class Header extends React.Component {
    render() {
        return (
    		<h5 style={styles.main}>
    			{this.props.text}
    		</h5>
    	);
    }
}
