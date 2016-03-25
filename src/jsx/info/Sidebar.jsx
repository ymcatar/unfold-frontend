import React from 'react';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { fetchEvent } from 'redux/actions/event';

import { Info as Colors } from 'config/Colors.jsx';

import EventDetail from './common/EventDetail.jsx';
import Information from './common/Information.jsx';
import RoleList from './common/RoleList.jsx';

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

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hide: props.mobile};
    }

    componentWillMount() {
        this.props.fetchEvent();
    }

    render() {
        let { title, description, information, roles, mobile } = this.props;
        let { hide } = this.state;

        let owners = roles.filter(a => a.type == "OWNER");
        let contributors = roles.filter(a => a.type == "CONTRIBUTOR");
        let translators = roles.filter(a => a.type == "TRANSLATOR");

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
                    <EventDetail title={title} description={description} />
                    <Information data={information} />
                    <RoleList data={owners} header="OWNER" />
                    <RoleList data={contributors} header="CONTRIBUTORS" />
                    <RoleList data={translators} header="TRANSLATORS" />
                </div>
            </div>
        );
    }
}

let { arrayOf, shape, string, bool, number } = React.PropTypes;

Sidebar.propTypes = {
    title: string,
    location: string,
    tags: arrayOf(string),
    description: string,
    information: string,
    startedAt: string,
    endedAt: string,
    timezone: number,
    language: string,
    roles: arrayOf(shape({
        type: string,
        user: shape({
            id: string,
            name: string,
            description: string
        })
    })),
    mobile: bool
};

Sidebar.defaultProps = {
    mobile: false
};

export default connect(
    function stateToProps(state) {
        console.log(state.event);
        return state.event;
    },
    function dispatchToProps(dispatch) {
        return {
            fetchEvent: id => dispatch(fetchEvent(id))
        };
    }
)(Sidebar);
