import React from 'react';
import _ from 'lodash';

import { hideScraperSettings } from 'redux/actions/modal';
import { getScrapperConfig, putScraperConfig } from 'redux/actions/ajax';

import { connect } from 'react-redux';

import { Modal, Button, Input, Panel, PanelGroup, Table } from 'react-bootstrap';

const exportData = data => {
    let output = {};
    data.forEach(item => {
        let { website, option, name } = item;
        if (!output[website])
            output[website] = {
                type: website,
                config: {
                    hashtags: [],
                    users: []
                }
            };
        output[website].config[option].push(name);
    });

    let array = [];
    for (let key in output)
        array.push(output[key]);

    return array;
};

const importData = data => {
    if (!data)
        return [];

    let output = [];
    data.forEach(item => {
        let { hashtags, users } = item.config;
        let website = item.type;
        hashtags.forEach(i => { output.push({ website, option: 'hashtags', name: i }); });
        users.forEach(i => { output.push({ website, option: 'users', name: i }); });
    });
    return output;
};

class scraperSettings extends React.Component {

    constructor(props) {
        super(props);
        this.elm = {};
        this.state = {
            activeKey: 1,
            data: [],
            website: 'disable',
            option: 'disable',
            name: ''
        };
        _.bindAll(this, [
            'handleSelect',
            'handleAddSubmit',
            'handleSubmit',
            'handleDelete'
        ]);
    }

    componentWillMount() {
        this.props.getScrapperConfig(this.props.token, this.props.eventId);
    }

    componentWillReceiveProps(newProps) {
        if (!_.eq(newProps.data, this.props.data))
            this.setState({
                data: importData(newProps.data)
            });
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
    }

    handleAddSubmit() {
        this.state.data.push(_.pick(this.state, ['website', 'option', 'name']));
        this.setState({
            website: 'disable',
            option: 'disable',
            name: ''
        });
    }

    handleSubmit() {
        this.props.putScraperConfig(this.props.token, this.props.eventId, exportData(this.state.data));
    }

    handleDelete(i) {
        let { data } = this.state;
        data = _.clone(data);
        data.splice(i, 1);
        this.setState({ data: data });
    }

    render() {
        const source = (
            <Input
                label="Source Website"
                value={this.state.website}
                type="select"
                ref={x => {this.elm.website = x; }}
                onChange={() => { this.setState({website: this.elm.website.getValue()}); }}>
                <option value={'disable'} disabled>
                    --- Please Select ---
                </option>
                <option value={'twitter'}>Twitter</option>
                <option disabled value={'facebook'}>Facebook (unavailable in demo)</option>
                <option disabled value={'reddit'}>Reddit (unavailable in demo)</option>
                <option disabled value={'googleplus'}>Google+ (unavailable in demo)</option>
                <option disabled value={'youtube'}>YouTube (unavailable in demo)</option>
                <option disabled value={'imgur'}>Imgur (unavailable in demo)</option>
                <option disabled value={'instagram'}>Instagram (unavailable in demo)</option>
                <option disabled value={'rss'}>RSS (unavailable in demo)</option>
            </Input>
        );

        const generateOption = (
            <Input
                label="Type of Content"
                value={this.state.option}
                ref={x => {this.elm.option = x; }}
                onChange={() => { this.setState({option: this.elm.option.getValue()}); }}
                type="select">
                <option value={'disable'} disabled>--- Please Select ---</option>
                <option value={'hashtags'}>follow a hash tag</option>
                <option value={'users'}>follow a user</option>
            </Input>
        );

        const generateNameInput = (
            <Input
                ref={x => {this.elm.name = x; }}
                onChange={() => { this.setState({name: this.elm.name.getValue()}); }}
                value={this.state.name}
                label="Name"
                type="text" />
        );

        const generateTable = (
            <Table>
                <thead>
                    <tr>
                        <th width="10%">Website</th>
                        <th width="10%">Type</th>
                        <th>Name</th>
                        <th width="3%"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item, i) => (
                        <tr key={item.website+item.option+item.name}>
                            <td>{item.website}</td>
                            <td>{item.option}</td>
                            <td>{item.name}</td>
                            <td>
                                <a href="#" onClick={() => { this.handleDelete(i); }}>
                                    <i className="zmdi zmdi-delete"/>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );

        let validSource = (
            this.state.website === 'disable' ||
            this.state.option === 'disable' ||
            this.state.name === ''
        );

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Scraper Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                        <Panel header="Add New Source" eventKey={1}>
                            {source}
                            {generateOption}
                            {generateNameInput}
                            <Button
                                bsStyle="primary"
                                bsSize="small"
                                disabled={validSource}
                                onClick={this.handleAddSubmit}>
                                Add
                            </Button>
                        </Panel>
                        <Panel header="Edit Source" eventKey={2}>
                            {generateTable}
                        </Panel>
                    </PanelGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        bsSize="small"
                        onClick={this.props.handleHide}>
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleSubmit}
                        bsSize="small"
                        bsStyle="primary">
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            show: state.modal.active === 'scraperSettings',
            data: state.config? state.config.scraper: null,
            eventId: state.ui.eventId,
            token: state.auth? state.auth.token: null
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleHide: () => dispatch(hideScraperSettings()),
            getScrapperConfig: (token, eventId) => dispatch(getScrapperConfig(token, eventId)),
            putScraperConfig: (token, eventId, data) => dispatch(putScraperConfig(token, eventId, data))
        };
    }
)(scraperSettings);
