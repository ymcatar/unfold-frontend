import React from 'react';

import CollapseBox from './CollapseBox.jsx';
import AvatarList from './AvatarList.jsx';

export default class RoleList extends React.Component {
    render() {
        let total = this.props.data.length;
        let online = this.props.data.filter(curr => curr.online).length;
        let { header } = this.props;

        return (
            <CollapseBox header={`${header} (${online}/${total})`} defaultCollapsed={false} >
                <AvatarList data={this.props.data} />
            </CollapseBox>
        );
    }
}
