import React from 'react';

import Colors from 'config/Colors.jsx';

import CollapseBox from '../common/CollapseBox.jsx';
import InfoBox from './InfoBox.jsx';

const styles = {
    container: {
        maxHeight: '50vh',
        padding: '10px',
        overflowY: 'scroll',
        borderTop: `1px solid ${Colors.info.information.borderColor}`,
        borderBottom: `1px solid ${Colors.info.information.borderColor}`
    }
};

export default class Information extends React.Component {
    render() {
        return (
            <CollapseBox
                header="INFORMATION"
                defaultCollapsed={true} >
                <div style={styles.container}>
                    <InfoBox data={this.props.data}/>
                </div>
            </CollapseBox>
        );
    }
}
