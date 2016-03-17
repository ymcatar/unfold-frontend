import React from 'react';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import { Info as Colors } from 'config/Colors.jsx';

import EventDetail from './common/EventDetail.jsx';

import Information from './reader/Information.jsx';
import Translators from './reader/Translators.jsx';
import Contributors from './reader/Contributors.jsx';

const styles = {
    main: {
        background: Colors.background,
        color: Colors.color,
        height: '100vh',
        zIndex: 4
    },
    container: (hide, mobile) => ({
        minWidth: '300px',
        width: mobile? '80vw': '300px',
        padding: '20px 20px 50px 5px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        display: hide? 'none': 'block'
    }),
    button: hide => ({
        position: 'absolute',
        top: '60px',
        left: '30px',
        height: '30px',
        width: '30px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '50% !important'
    })
};

class ReaderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hide: props.mobile};
    }
    render() {
        let { event, info, contributors, translators, mobile } = this.props;
        let { hide } = this.state;
        return (
            <div style={styles.main}>
                <Button
                    bsSize="xsmall"
                    bsStyle="warning"
                    style={styles.button(hide)}
                    onClick={() => { this.setState({hide: !hide}); }}>
                    {hide? <i className="material-icons">keyboard_arrow_right</i>:
                        <i className="material-icons">keyboard_arrow_left</i>}
                </Button>
                <div style={styles.container(hide, mobile)}>
                    <EventDetail title={event.title} description={event.description} />
                    <Information data={info} />
                    <Contributors data={contributors} />
                    <Translators data={translators} />
                </div>
            </div>
        );
    }
}

let { arrayOf, shape, string, bool } = React.PropTypes;

ReaderInfo.propTypes = {
    event: shape({
        title: string.isRequired,
        description: string.isRequired
    }).isRequired,
    info: string.isRequired,
    contributors: arrayOf(
     shape({
            id: string,
            name: string.isRequired,
            title: string.isRequired,
            image: string.isRequired,
            online: bool.isRequired
        })),
    translators: arrayOf(
        shape({
            id: string,
            name: string.isRequired,
            title: string.isRequired,
            image: string.isRequired,
            online: bool.isRequired
        })),
    mobile: bool
};

ReaderInfo.defaultProps = {
    event: { title: '', description: '' },
    info: '',
    contributors: [],
    translators: [],
    mobile: false
};

export default connect(
    function stateToProps(state) {
        return state.event;
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(ReaderInfo);
