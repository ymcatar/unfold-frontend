import React from 'react';
import fetch from 'fetch-jsonp';

export default class TypeEmbed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount() {
        this.node.addEventListener('load', this.onLoad, true);
        fetch('http://noembed.com/embed?url=' + this.props.path.trim())
            .then(res => res.json())
            .then(body => {
                this.setState({
                    body: body.html
                });
                if (this.props.onResize)
                    this.props.onResize();
            });
    }

    componentWillUnmount() {
        this.node.removeEventListener('load', this.onLoad, true);
    }

    onLoad() {
        setTimeout(() => {
            if (this.props.onResize)
                this.props.onResize();
        }, 1000);
    }

    render() {
        return (
            <div
                ref={x => { this.node = x; }}
                dangerouslySetInnerHTML={{__html: this.state.body}} />
        );
    }
}
