import React from 'react';
import {Label} from 'react-bootstrap';

import uuid from 'node-uuid';

const Styles = {
    main: {
        marginRight: '5px'
    }
};

export default class Tags extends React.Component {
    render() {
        let tags = this.props.data.map(item => {
            let text, bsStyle;
            switch(item) {
                case 'reliable':
                    text = 'Reliable';
                    bsStyle = 'success';
                    break;
                case 'important':
                    text = 'Important';
                    bsStyle = 'info';
                    break;
                case 'unverified':
                    text = 'Unverified';
                    bsStyle = 'danger';
                    break;
                default:
                    text = item;
                    bsStyle = 'default';
                    break;
            }
            return (
                <Label
                    style={Styles.main}
                    key={uuid.v1()}
                    bsStyle={bsStyle}>
                    {text}
                </Label>
            );
        });
        return (
            <div>
                {tags}
            </div>
        );
    }
}
