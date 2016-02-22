import React from 'react';
import {Panel} from 'react-bootstrap';

import Colors from 'config/Colors.jsx';

const generateStyle = function(props) {
    return {
        container: {
            backgroundColor: Colors.info.backgroundColor
        }
    };
};

const generateHeader = function(text) {
    return (
        <h5 style={styles.header}>
            {text}
        </h5>
    );
};

export default class CollapseBox extends React.Component {
    constructor() {
        super();
        this.state = { open: false };
        this.onSelect = this.onSelect.bind(this);
    }
    onSelect(test) {
        localStorage[this.id] = !this.state.open;
        this.setState({
            open: !this.state.open
        });
    }
    componentWillMount() {
        this.id = this.props.header;
        let open = localStorage[this.props.header]?
            JSON.parse(localStorage[this.props.header]):
            !this.props.defaultCollapsed;

        this.setState({
            open: open
        });
    }
    render() {
        const styles = generateStyle(this.props);
        return(
            <Panel
                className="collapseBox"
                header={
                    <div>
                        {this.props.header}
                        {this.state.open?
                            <i className="fa fa-angle-up pull-left" />:
                            <i className="fa fa-angle-down pull-left" />
                        }
                    </div>
                }
                collapsible
                onSelect={this.onSelect}
                expanded={this.state.open}>
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </Panel>
        );
    }
}
