import React from 'react';
import ReactDOM from 'react-dom';
import Lazy from 'react-lazy-load';

const getInnerStyle = loaded => {
    var styles = {};
    if (!loaded)
        styles.height = '400px';
    return styles;
};

export default class LazyLoad extends React.Component {

    constructor() {
        super();
        this.state = {loaded: false};
        this.setLoaded = this.setLoaded.bind(this);
    }

    setLoaded() {
        this.setState({loaded: true});
    }

    render() {
        return (
            <Lazy onContentVisible={this.setLoaded} height={this.state.loaded? null: 500}>
                {this.props.children}
            </Lazy>
        );
    }
}
