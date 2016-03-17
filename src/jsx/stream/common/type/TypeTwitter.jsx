import React from 'react';

const styles = {
    post: {
        borderLeft: '5px solid #EEEEEE',
        padding: '0px 0px 0px 10px',
        minHeight: '175px'
    }
};

let twttrInit = new Promise(resolve => { window.twttr.ready(resolve); });

export default class TypeTwitter extends React.Component {
    componentDidMount() {
        let id = this.props.path.match(/[0-9]+/)[0];
        twttrInit
            .then(() => window.twttr.widgets.createTweet(id, this.bodyNode))
            .then(() => {
                if (!this.bodyNode)
                    return;
                setTimeout(() => {
                    if (this.props.onResize)
                        this.props.onResize();
                }, 500);
            });
    }

    render() {
        return (
            <div style={styles.post} ref={x => { this.bodyNode = x; }} />
        );
    }
}

let { string, func, type } = React.PropTypes;

TypeTwitter.PropTypes = {
    path: string,
    onResize: func.isRequired
};
