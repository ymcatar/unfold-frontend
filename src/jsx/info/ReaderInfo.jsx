import React from 'react';

import EventDetail from './common/EventDetail.jsx';

import Information from './reader/Information.jsx';
import Translators from './reader/Translators.jsx';
import Contributors from './reader/Contributors.jsx';

export default class ReaderInfo extends React.Component {
    render() {
        return (
            <div>
                <EventDetail
                    title={this.props.data.event.title}
                    description={this.props.data.event.description} />

                <Information data={this.props.data.info} />

                <Contributors data={this.props.data.contributors} />
                <Translators data={this.props.data.translators} />
            </div>
        );
    }
}
