import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Panel, PanelGroup, Table } from 'react-bootstrap';
import _ from 'lodash';

export default class ModifySource extends React.Component {

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
            'handleAddSubmit'
        ]);
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
        console.log(this.state.data);
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
                <option value={'facebook'}>Facebook</option>
                <option value={'twitter'}>Twitter</option>
                <option value={'reddit'}>Reddit</option>
                <option value={'googleplus'}>Google+</option>
                <option value={'youtube'}>YouTube</option>
                <option value={'imgur'}>Imgur</option>
                <option value={'flickr'}>Flickr</option>
                <option value={'instagram'}>Instagram</option>
                <option value={'rss'}>RSS</option>
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
                <option value={'hashtag'}>follow a hash tag</option>
                <option value={'user'}>follow a user</option>
                <option value={'page'}>follow a page</option>
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
                        <th>Website</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(item => (
                        <tr>
                            <td>{item.website}</td>
                            <td>{item.option}</td>
                            <td>{item.name}</td>
                            <td>
                                <a href="#">
                                    <i className="fa fa-trash"/>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Source</Modal.Title>
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
                        bsSize="small"
                        bsStyle="primary">
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
