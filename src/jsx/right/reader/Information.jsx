import React from 'react';

import Colors from 'config/Colors.jsx';

import CollapseBox from 'right/common/CollapseBox.jsx';
import InfoBox from 'right/reader/InfoBox.jsx';

const styles = {
    container: {
        maxHeight: '50vh',
        padding: '10px',
        overflowY: 'scroll',
        borderTop: `2px solid ${Colors.right.Information.borderColor}`,
        borderBottom: `2px solid ${Colors.right.Information.borderColor}`
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
