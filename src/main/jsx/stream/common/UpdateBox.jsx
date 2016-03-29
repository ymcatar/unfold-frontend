import React from 'react';
import MediaQuery from 'react-responsive';

import { connect } from 'react-redux';
import { showReaderProof } from 'redux/actions/modal';

import { Button } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

import Colors from 'config/colors';

import Card from 'common/Card.jsx';

import ReaderHeader from './header/ReaderHeader.jsx';
import ContributorHeader from './header/ContributorHeader.jsx';

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

        let header;
        switch (this.props.role) {
            case "reader":
            case "translator":
                header = (
                    <ReaderHeader author={this.props.data.author} />
                );
                break;
            case "contributor":
                header = (
                    <ContributorHeader
                        data={this.props.data} />
                );
                break;
        }

        let embedBody = this.props.data.data? (
            <Type
                site={this.props.data.data.site}
                path={this.props.data.data.url}
                onResize={this.props.onResize} />
        ): null;

        return (
            <div style={_.extend({}, styles.main, this.props.style)}>
                <Card>
                    {header}
                    <div style={styles.content}>
                        <TypeText data={this.props.data.caption} />
                        {embedBody}
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
