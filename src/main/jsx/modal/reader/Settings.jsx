import React from 'react';
import _ from 'lodash';

import { hideReaderSettings } from 'redux/actions/modal';
import { storeReaderSettings } from 'redux/actions/ui';

import { connect } from 'react-redux';

import { Modal, Button, Input } from 'react-bootstrap';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = { lang: 'en' };
        _.bindAll(this, ['handleSubmit']);
    }

    componentWillMount() {
        if (localStorage.readerSettings) {
            let settings = localStorage.readerSettings;
            settings = JSON.parse(settings);
            this.props.storeReaderSettings(settings);
            this.setState({ lang: settings.lang });
        }
    }

    handleSubmit() {
        let data = { lang: this.state.lang };
        console.log(data.lang);
        localStorage.readerSettings = JSON.stringify(data);
        this.props.storeReaderSettings(data);
        location.reload();

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        onChange={e => { this.setState({lang: e.target.value}); }}
                        value={this.state.lang}
                        type="select"
                        label="Stream Language"
                        placeholder="select">
                        <option value="en">English</option>
                        <option value="zh-hant">Traditional Chinese</option>
                    </Input>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsSize="small" onClick={this.props.handleHide}>Cancel</Button>
                    <Button onClick={this.handleSubmit} bsSize="small" bsStyle="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            show: state.modal.active === 'readerSettings'
        };
    },
    function dispatchToProps(dispatch) {
        return {
            getStream: (eventId, lang) => dispatch(getStream(eventId, lang)),
            startStreaming: (eventId, lang) => dispatch(startStreaming(eventId, lang)),
            handleHide: () => dispatch(hideReaderSettings()),
            showSuccess: msg => dispatch(showSuccess(msg)),
            storeReaderSettings: data => dispatch(storeReaderSettings(data))
        };
    }
)(Settings);
