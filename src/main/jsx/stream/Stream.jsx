import React from 'react';
import _ from 'lodash';
import SweetScroll from 'sweet-scroll';

import { connect } from 'react-redux';

import { getStream, getRaw, startStreaming, startScraper } from 'redux/actions/ajax';
import { storeReaderSettings } from 'redux/actions/ui';
import { resetScroll } from 'redux/actions/stream';

import { Stream as Colors } from 'config/colors';

import Posts from './common/Posts.jsx';

const styles = {
    main: {
        position: 'relatve',
        backgroundColor: Colors.backgroundColor,
        height: '100vh',
        width: '100%',
        padding: '30px',
        paddingBottom: '100px',
        overflowY: 'scroll'
    },
    header: {
        width: '100%',
        height: '150px',
        fontSize: '60px',
        color: Colors.header,
        padding: '30px 0 10px 20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        fontWeight: 'lighter'
    },
    marker: {
        width: '100%',
        padding: '30px 0 10px 20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        fontSize: '30px',
        fontWeight: 'lighter',
        color: Colors.header
    }
};

export default class Stream extends React.Component {
    componentWillMount() {
        localStorage.readerSettings = localStorage.readerSettings || "{}";
        switch(this.props.role) {
            case 'reader':
                let lang = JSON.parse(localStorage.readerSettings).lang || 'en';
                this.props.getStream(this.props.eventId, lang);
                this.props.startStreaming(this.props.eventId, lang);
                break;
            case 'translator':
                this.props.getStream(this.props.eventId, this.props.lang);
                this.props.startStreaming(this.props.eventId, this.props.lang);
                break;
            case 'contributor':
                this.props.startScraper(this.props.token, this.props.eventId);
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.scrollPending && typeof nextProps.position == 'number') {
            this.sweetScroll = new SweetScroll({}, this.elm);
            this.sweetScroll.to({ top: nextProps.position });
            this.props.resetScroll();
        } else if (nextProps.scrollPending && typeof nextProps.position == 'string') {
            this.sweetScroll = new SweetScroll({}, this.elm);
            this.sweetScroll.toElement(document.getElementById(nextProps.position));
            this.props.resetScroll();
        }
    }

    render() {
        let { filteredStream, filteredNewStream, role, filter } = this.props;

        let newStream = (
            <Posts data={filteredNewStream} role={role} type="new" lang={this.props.lang} />
        );

        let oldStream = role == 'reader' || role == 'translator'? (
            <Posts data={filteredStream} role={role} marker={true} type="old" lang={this.props.lang} />
        ): null;

        return (
            <div style={styles.main} ref={x => {this.elm = x;}}>
                <div key="heading" style={styles.header}>
                    #{filter}
                </div>
                {filteredNewStream.length > 0?
                    (<p style={styles.marker}>New Update</p>): null}
                {oldStream}
                {newStream}
            </div>
        );
    }
}

export default connect(
    function stateToProps(state, props) {
        return {
            filter: state.stream.filter,
            filteredStream: state.stream.filteredStream,
            filteredNewStream: state.stream.filteredNewStream || [],
            scrollPending: state.stream.scrollPending,
            position: state.stream.position,
            eventId: state.ui.eventId,
            lang: state.ui.readerSettings?
                state.ui.readerSettings.lang: 'en'
        };

    },
    function dispatchToProps(dispatch, props) {
        switch(props.role) {
            case 'reader':
            case 'translator':
                return {
                    getStream: (eventId, lang) => dispatch(getStream(eventId, lang)),
                    startStreaming: (eventId, lang) => dispatch(startStreaming(eventId, lang)),
                    resetScroll: () => dispatch(resetScroll()),
                    storeReaderSettings: data => dispatch(storeReaderSettings(data)),
                };
            case 'contributor':
                return {
                    startScraper: (token, eventId) => dispatch(startScraper(token, eventId)),
                    resetScroll: () => dispatch(resetScroll())
                };
        }
    }
)(Stream);
