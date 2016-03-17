import React from 'react';
import _ from 'lodash';

import { Panel } from 'react-bootstrap';

import { CollapseBox as Colors } from 'config/Colors.jsx';

const styles = {
    main: {
        backgroundColor: Colors.backgroundColor
    }
};

const generateHeader = text => (
    <h5 style={styles.header}>{text}</h5>
);

export default class CollapseBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        _.bindAll(this, ['onSelect']);
    }

    onSelect(test) {
        localStorage[this.id] = !this.state.open;
        this.setState({ open: !this.state.open });
    }

    componentWillMount() {
        this.id = this.props.header;
        this.setState({ open: localStorage[this.props.header]?
            JSON.parse(localStorage[this.props.header]): !this.props.defaultCollapsed
        });
    }

    render() {
        const header = (
            <div>
                {this.state.open?
                    <i className="material-icons">keyboard_arrow_up</i>:
                    <i className="material-icons">keyboard_arrow_down</i>}
                {this.props.header}
            </div>
        );

        return (
            <Panel
                className="collapseBox"
                header={header}
                collapsible
                onSelect={this.onSelect}
                expanded={this.state.open}>
                <div style={styles.main}>{this.props.children}</div>
            </Panel>
        );
    }
}

let { string, bool } = React.PropTypes;

CollapseBox.PropTypes = {
    header: string.isRequired,
    defaultCollapsed: bool
};

CollapseBox.defaultProps = {
    defaultCollapsed: false
};
