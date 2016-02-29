import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input } from 'react-bootstrap';
import _ from 'lodash';

class ReaderMail extends React.Component {
    constructor(props) {
        super(props);
        this.elm = {};
        _.bindAll(this, ['handleSubmit']);
    }

    handleSubmit() {
        let output = {
            target: this.elm.target.getValue(),
            content: this.elm.content.getValue()
        };
        console.log(output);
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Message To Contributor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        ref={x => {this.elm.target = x;}}
                        type="select"
                        label="Send to"
                        multiple>
                        {
                            this.props.contributor.map(o => (
                                <option value={o.id} key={o.id}>
                                    {o.name}
                                </option>
                            ))
                        }
                    </Input>
                    <Input
                        ref={x => {this.elm.content = x;}}
                        type="textarea"
                        style={{height: 300}}
                        label="Mail content" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleHide}>Cancel</Button>
                    <Button
                        onClick={this.handleSubmit}
                        bsStyle="primary">
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            contributor: state.event.contributors
        };
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(ReaderMail);
