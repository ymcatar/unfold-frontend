import React from 'react';
import _ from 'lodash';

import { Panel } from 'react-bootstrap';
import { CollapseBox as Colors } from 'config/colors';

const styles = {
    main: {
        border: `1px solid ${Colors.borderColor}`,
        borderTopWidth: '0px',
        borderBottomWidth: '2px'
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
                    <i className="zmdi zmdi-chevron-up" />:
                    <i className="zmdi zmdi-chevron-down" />}
                &nbsp;{this.props.header}
            </div>
        );

        return (
            <Panel
                className="collapseBox"
                header={header}
                style={styles.main}
                collapsible
                onSelect={this.onSelect}
                expanded={this.state.open}>
                <div>{this.props.children}</div>
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
