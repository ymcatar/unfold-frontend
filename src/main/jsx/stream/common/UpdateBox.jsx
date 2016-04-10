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
        margin: '5px auto 5px auto'
    },
    content: {
        minWidth: '75%',
        maxWidth: '550px',
        margin: '10px 0px 10px 0px',
        overflowY: 'hidden'
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

    handleVerify() {
        this.props.handleVerify(this.props.data);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.visible != nextProps.visible;
    }

    render() {

        console.log(this.props.visible);

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
                header = (
                    <ReaderHeader author={this.props.data.author} time={this.props.data.createdAt} />
                );
                break;
            case "contributor":
            case "translator":
                header = (
                    <ContributorHeader data={this.props.data} />
                );
                break;
        }

        let embedBody = this.props.data.data? (
            <Type
                loaded={this.props.visible}
                site={this.props.data.data.site}
                path={this.props.data.data.url} />
        ): null;

        let caption = this.props.data.caption;
        let lang = JSON.parse(localStorage.readerSettings).lang || 'en';
        if (this.props.data.translations && this.props.data.translations[lang])
            caption = this.props.data.translations[lang].content;

        return (
            <div style={styles.main}>
                <Card>
                    {header}
                    <div style={styles.content}>
                        <TypeText data={caption} />
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
        return {
            lang: state.ui.readerSettings? state.ui.readerSettings.lang: 'en'
        };
    },
    function dispatchToProps(dispatch) {
        return {
            showReaderProof: () => dispatch(showReaderProof())
        };
    }
)(UpdateBox);
