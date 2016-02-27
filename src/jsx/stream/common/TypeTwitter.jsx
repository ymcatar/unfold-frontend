import React from 'react';

let twttrInit = new Promise(resolve => {
    window.twttr.ready(resolve);
});

export default class TypeTwitter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let id = this.props.data.source.path.match(/[0-9]+/)[0];
        twttrInit
            .then(() => window.twttr.widgets.createTweet(id, this.bodyNode))
            .then(() => {
                if (!this.bodyNode)
                    return;
                setTimeout(() => {
                    if (this.props.onResize)
                        this.props.onResize();
                }, 1000);
            });
    }

    render() {
        return (
            <div
                ref={x => { this.bodyNode = x; }} />
        );
    }
}
