import React from 'react';

import CollapseBox from 'right/common/CollapseBox.jsx';
import AvatarList from 'right/common/AvatarList.jsx';

export default class Translators extends React.Component {
    render() {
        let total = this.props.data.length;
        let online = this.props.data.filter(curr => curr.online).length;

        return (
            <CollapseBox
                header={`TRANSLATORS (${online}/${total})`}
                defaultCollapsed={false} >
                <AvatarList data={this.props.data} />
            </CollapseBox>
        );
    }
}
