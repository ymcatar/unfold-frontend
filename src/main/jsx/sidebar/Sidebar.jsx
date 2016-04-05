import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';
import { toggleSidebar } from 'redux/actions/ui';

import { Info as Colors } from 'config/colors';

import ReaderSidebar from './ReaderSidebar.jsx';
import ContributorSidebar from './ContributorSidebar.jsx';
import TranslatorSidebar from './TranslatorSidebar.jsx';

const styles = {
    main: (show, mobile) => ({
        background: Colors.background,
        color: Colors.color,
        height: '100vh',
        zIndex: 4,
        overflowY: 'scroll',
        boxShadow: Colors.zDepth,
        width: mobile? '90vw': '300px',
        minWidth: mobile? '90vw': '300px',
        padding: '20px',
        display: show? 'block': 'none'
    })
};

const isMobile = () => window.matchMedia("(max-device-width: 1224px)").matches;
const isSmall = () => window.matchMedia("(max-width: 800px)").matches;

class Sidebar extends React.Component {
    componentWillMount() {
        if (this.props.mobile)
            this.props.hideSidebar();
    }

    render() {
        let content = null;
        switch (this.props.role) {
            case "reader":
                content = <ReaderSidebar />;
                break;
            case "contributor":
                content = <ContributorSidebar />;
                break;
            case "translator":
                content = <TranslatorSidebar />;
                break;
        }

        let { show, mobile } = this.props;
        return (
            <div style={styles.main(show, mobile)}>
                {content}
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        return {
            show: state.ui.sidebar
        };
    },
    function dispatchToProps(dispatch) {
        return {
            hideSidebar: val => dispatch(toggleSidebar(false))
        };
    }
)(Sidebar);
