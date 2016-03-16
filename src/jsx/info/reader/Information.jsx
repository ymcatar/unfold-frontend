import React from 'react';

import markdown from 'common/Markdown.js';

import { Information as Colors } from 'config/Colors.jsx';

import CollapseBox from '../common/CollapseBox.jsx';

const styles = {
    container: {
        maxHeight: '50vh',
        padding: '10px',
        overflowY: 'scroll',
        borderTop: `2px solid ${Colors.borderColor}`,
        borderBottom: `2px solid ${Colors.borderColor}`
    }
};

export default class Information extends React.Component {
    render() {
        return (
            <CollapseBox header="INFORMATION" defaultCollapsed={true} >
                <div style={styles.container}>
                    <div dangerouslySetInnerHTML={{__html: markdown(this.props.data)}} />
                </div>
            </CollapseBox>
        );
    }
}
