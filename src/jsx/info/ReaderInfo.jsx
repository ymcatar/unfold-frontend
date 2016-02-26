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
                    title={this.props.event.title}
                    description={this.props.event.description} />

                <Information data={this.props.info} />

                <Contributors data={this.props.contributors} />
                <Translators data={this.props.translators} />
            </div>
        );
    }
}
