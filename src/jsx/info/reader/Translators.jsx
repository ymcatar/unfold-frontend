import React from 'react';

import CollapseBox from '../common/CollapseBox.jsx';
import AvatarList from '../common/AvatarList.jsx';

export default class Translators extends React.Component {
    render() {
        let total = this.props.data.length;
        let online = this.props.data.filter(curr => curr.online).length;

        return (
            <CollapseBox header={`TRANSLATORS (${online}/${total})`} defaultCollapsed={false} >
                <AvatarList data={this.props.data} />
            </CollapseBox>
        );
    }
}

let { arrayOf, shape, string, bool } = React.PropTypes;

Translators.propTypes = {
    data: arrayOf(
        shape({
            name: string.isRequired,
            title: string.isRequired,
            image: string.isRequired,
            online: bool.isRequired
        }))
};

Translators.defaultProps = { data: [] };
