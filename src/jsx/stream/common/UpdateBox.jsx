import React from 'react';
import MediaQuery from 'react-responsive';

import { connect } from 'react-redux';
import { showReaderProof } from 'redux/actions/modal';

import { Button } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

import Colors from 'config/colors';

import Card from 'common/Card.jsx';

import ContributorInfo from './ContributorInfo.jsx';

import Tags from './Tags.jsx';

import TypeText from './type/TypeText.jsx';
import Type from './type/Type.jsx';

const styles = {
    main: {
        width: '100%',
        minWidth: '100%',
        display: 'flex',
        margin: '2px auto'
    },
    content: {
        minWidth: '75%',
        maxWidth: '550px',
        margin: '10px 0px 10px 0px'
    },
    unverified: {
        marginTop: '10px'
    }
};

class UpdateBox extends React.Component {

    constructor(props) {
        super(props);
        _.bindAll(this, ['handleVerify']);
    }

    shouldComponentUpdate(nextProps) {
        let cond = this.props.data !== nextProps.data || this.props.small !== nextProps.small;
        if (cond)
            console.log('updating', this.key);
        return cond;
    }

    handleVerify() {
        this.props.handleVerify(this.props.data);
    }

    render() {
        if (!this.props.data)
            return null;

        let tags = this.props.data.tags && this.props.data.tags.length > 0? (
            <Tags data={this.props.data.tags} />
        ): null;

        let unverified = this.props.data.tags && this.props.data.tags.indexOf('unverified') >= 0? (
            <Button
                bsStyle="warning"
                bsSize="small" style={styles.unverified}
                onClick={this.props.showReaderProof}>
                Submit Proofs
            </Button>
        ): null;

        return (
            <div style={_.extend({}, styles.main, this.props.style)}>
                <Card>
                    {this.props.type == "stream"? (
                        <ContributorInfo
                            contributor={this.props.data.contributor}
                            submitTime={this.props.data.submitTime} />): null}

                    <div style={styles.content}>
                        <TypeText data={this.props.data.content} />
                        <Type
                            type={this.props.data.type}
                            path={this.props.data.source? this.props.data.source.path: null}
                            onResize={this.props.onResize} />
                    </div>
                    <div>
                        {tags}
                        {unverified}
                    </div>
                </Card>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {};
    },
    function dispatchToProps(dispatch) {
        return {
            showReaderProof: () => dispatch(showReaderProof())
        };
    }
)(UpdateBox);
