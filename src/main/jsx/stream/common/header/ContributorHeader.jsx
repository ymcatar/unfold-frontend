import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

import { selectEditorPost, switchSidebar } from 'redux/actions/ui';

import { Button } from 'react-bootstrap';

const styles = {
    info: {
        marginBottom: '20px',
        display: 'flex',
        padding: '10px',
        margin: '-15px -15px 10px -15px',
        borderBottom: '1px solid #eee'
    }
};

class ContributorHeader extends React.Component {

    constructor(props) {
        super(props);
        _.bindAll(this, ['handleClick']);
    }

    handleClick() {
        this.props.switchSidebar();
        this.props.selectPost(this.props.data);
    }

    render() {

        let disabled = this.props.editorPost && this.props.data?
            this.props.editorPost.id === this.props.data.id: false;

        return (
            <div style={styles.info}>
                <Button bsSize="small" onClick={this.handleClick} disabled={disabled}>
                    <i className="zmdi zmdi-plus" />
                </Button>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            editorPost: state.ui.editorPost
        };
    },
    function dispatchToProps(dispatch) {
        return {
            selectPost: val => dispatch(selectEditorPost(val)),
            switchSidebar: () => dispatch(switchSidebar('post'))
        };
    }
)(ContributorHeader);
