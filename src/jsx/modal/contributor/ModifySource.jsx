import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Panel, PanelGroup } from 'react-bootstrap';
import _ from 'lodash';

export default class ModifySource extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1
        };
        _.bindAll(this, [
            'handleSelect'
        ]);
    }

    handleSelect(activeKey) {
        this.setState({ activeKey });
    }

    render() {
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
                            <Input
                                label="Source Website"
                                type="text" />
                        </Panel>
                        <Panel header="Edit Source" eventKey={2}>
                            fork you.
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
