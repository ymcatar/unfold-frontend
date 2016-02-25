import React from 'react';
import _ from 'lodash';

const styles = {
    main: {
        position: 'relative',
        width: '100%',
        overflowY: 'auto'
    },
    body: {
        width: '100%'
    }
};

export default class LazyScroller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerHeight: 1000,
            layout: this.computeLayout(props, 1000),
            heightCache: {},
            forceScrollTop: false
        };
        this.scrollTop = 0;
        this.itemRefs = [];

        this.debouncedRelayout = _.debounce(this.relayout.bind(this), 200,
                                            {leading: true, maxWait: 200});
    }

    componentDidMount() {
        let layout = this.computeLayout(this.props, this.container.offsetHeight);

        this.setState({
            containerHeight: this.container.offsetHeight,
            layout: layout
        });
        this.scrollTop = this.container.scrollTop;

        this.props.onPositionChange(this.props.position, layout);
    }

    componentWillReceiveProps(nextProps) {
        let layout = this.computeLayout(nextProps);
        this.setState({layout});

        if (nextProps.position.scrollTop !== this.scrollTop)
            this.setState({forceScrollTop: true});
    }

    componentDidUpdate() {
        if (this.state.forceScrollTop) {
            this.container.scrollTop = this.props.position.scrollTop;
            this.setState({forceScrollTop: false});
        }
    }

    render() {
        let displayables = this.state.layout.map((attrs, i) => {
            let child = this.props.children[i];
            if (!React.isValidElement(child))
                child = this.props.placeholderFunc(`placeholder-${i}`,
                                                   this.props.placeholderHeight);

            let styles = {
                position: 'absolute',
                top: attrs.top,
                width: '100%',
                height: this.getHeightOf(child),
                overflowY: 'hidden'
            };

            return (
                <div
                    key={child.key}
                    style={styles}
                    ref={this.onReportHeight.bind(this, i)}>
                    <div style={{padding: '1px', margin: '-1px'}}>
                        {React.cloneElement(child, {
                            onResize: this.onUpdateHeight.bind(this, i)
                        })}
                    </div>
                </div>
            );
        });

        let bodyHeight = 0;
        for (let i = 0; i < this.props.children.length; i++)
            bodyHeight += this.getHeightOf(this.props.children[i]);

        return (
            <div
                // FIXME: scrollbar visible
                style={_.defaults(this.state.forceScrollTop ? { overflowY: 'hidden' } : {},
                                  this.props.style, styles.main)}
                onScroll={this.onScroll.bind(this)}
                ref={elm => { this.container = elm; }}>
                <div style={_.extend({height: bodyHeight}, styles.body)}>
                    {displayables}
                </div>
            </div>
        );
    }

    onReportHeight(index, node) {
        if (node)
            this.itemRefs[index] = node;
        else
            return;

        let child = this.props.children[index];
        if (!child) return;

        let key = child.key;
        if (!this.state.heightCache[key]) {
            this.state.heightCache[key] = node.firstElementChild.offsetHeight;
            this.debouncedRelayout();
        }
    }

    onUpdateHeight(index) {
        let node = this.itemRefs[index];
        if (!node) return;
        let child = this.props.children[index];
        if (!child) return;

        let key = child.key;
        setTimeout(() => {
            this.state.heightCache[key] = node.firstElementChild.offsetHeight;
            this.debouncedRelayout();
        }, 1000);
    }

    computePosition(scrollTop) {
        let children = this.props.children;
        let lastPosition = this.props.position;
        let position = {
            index: lastPosition.index,
            offset: lastPosition.offset + scrollTop - lastPosition.scrollTop,
            scrollTop: scrollTop
        };

        let height;
        while (position.offset > (height = this.getHeightOf(children[position.index])) &&
               position.index < children.length - 1) {
            position.index += 1;
            position.offset -= height;
        }
        while (position.offset < 0 && position.index > 0) {
            position.index -= 1;
            position.offset += this.getHeightOf(children[position.index]);
        }
        if (position.offset < 0) {
            position = {
                index: 0,
                offset: 0,
                scrollTop: 0
            };
        }

        return position;
    }

    computeLayout(props, containerHeight = this.state.containerHeight) {
        let {position, children, preloadRatio} = props;

        let layout = new Array(children.length);

        let displayBottom = -position.offset;
        let targetBottom = containerHeight * (preloadRatio + 1);
        for (let i = position.index; i < children.length && displayBottom < targetBottom; i++) {
            let height = this.getHeightOf(children[i]);
            layout[i] = {
                height: height,
                top: position.scrollTop + displayBottom
            };
            displayBottom += height;
        }

        let displayTop = -position.offset;
        let targetTop = -containerHeight * preloadRatio;
        for (let i = position.index - 1; i >= 0 && displayTop > targetTop; i--) {
            let height = this.getHeightOf(children[i]);
            layout[i] = {
                height: height,
                top: position.scrollTop + displayTop - height
            };
            displayTop -= height;
        }

        return layout;
    }

    relayout() {
        let layout = this.computeLayout(this.props);
        this.setState({layout});
    }

    getHeightOf(child) {
        if (!child)
            return this.props.placeholderHeight;

        return (child.props.height
            || this.state.heightCache[child.key]
            || this.props.placeholderHeight);
    }

    onScroll() {
        this.scrollTop = this.container.scrollTop;

        let position = this.computePosition(this.scrollTop);

        // Only update if scrolling across item boundary
        if (position.index !== this.props.position.index)
            this.props.onPositionChange(position, this.state.layout);
    }
}

LazyScroller.propTypes = {
    children: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.shape({
                props: React.PropTypes.shape({
                    key: React.PropTypes.any.isRequired
                }).isRequired
            })])
    ).isRequired,

    position: React.PropTypes.shape({
        index: React.PropTypes.number.isRequired,
        offset: React.PropTypes.number.isRequired,
        scrollTop: React.PropTypes.number.isRequired
    }),
    onPositionChange: React.PropTypes.func,

    placeholderFunc: React.PropTypes.func,
    placeholderHeight: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]),

    preloadRatio: React.PropTypes.number.isRequired,

    style: React.PropTypes.object
};

LazyScroller.defaultProps = {
    position: {
        index: 0,
        offset: 0,
        scrollTop: 0
    },
    onPositionChange: () => {},

    placeholderFunc: function placeholder(key, height) {
        return <div key={key} style={{height: height}} />;
    },
    placeholderHeight: 300,

    preloadRatio: 3
};
