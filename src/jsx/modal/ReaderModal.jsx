import React from 'react';

import { connect } from 'react-redux';
import { hideReaderMail, hideReaderProof } from 'redux/actions/modal';

import Mail from './reader/Mail.jsx';
import Proof from './reader/Proof.jsx';

class ReaderModal extends React.Component {
    render() {
        return (
            <div>
                <Mail
                    show={this.props.active === 'readerMail'}
                    handleHide={this.props.hideReaderMail} />
                <Proof
                    show={this.props.active === 'readerProof'}
                    handleHide={this.props.hideReaderProof} />
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            active: state.modal.active,
            data: state.modal.data
        };
    },
    function dispatchToProps(dispatch) {
        return {
            hideReaderMail: () => dispatch(hideReaderMail()),
            hideReaderProof: () => dispatch(hideReaderProof())
        };
    }
)(ReaderModal);
