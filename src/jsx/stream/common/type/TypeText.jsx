import React from 'react';

export default class TypeText extends React.Component {
    render() {
        let data = this.props.data || '';
        return (
            <div>
                <p dangerouslySetInnerHTML={{__html: data}} />
            </div>
        );
    }
}

let { string } = React.PropTypes;

TypeText.PropTypes = {
    data: string
};
