import React from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { toggleSidebar } from 'redux/actions/ui';

import { Info as Colors } from 'config/colors';

import ReaderSidebar from './reader/ReaderSidebar.jsx';

import Editor from './editor/Editor.jsx';

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

        if (this.props.role == "reader") {
            let { show } = this.props;
            return (
                <div style={styles.main(show, this.props.mobile)}>
                    <ReaderSidebar />
                </div>
            );
        } else if (this.props.role == "contributor") {
            let { show, mobile, type } = this.props;
            return (
                <div style={styles.main(show, mobile)}>
                    <Editor type={type} />
                </div>
            );
        } else
            return null;
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
