import React from 'react';
import _ from 'lodash';
import SweetScroll from 'sweet-scroll';

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

        if (!props.position.scrollTop)
            props.position.scrollTop = this.getScrollTopOf(props.position);

        this.state = {
            containerHeight: 1000,
            layout: this.computeLayout(props, 1000),
            heightCache: {},
            forceScrollTop: false
        };

        this.scrollTop = 0;
        this.container = null;
        this.sweetScroll = null;
        this.itemRefs = [];

        this.debouncedRelayout = _.debounce(this.relayout.bind(this), 50, {leading: true, maxWait: 50});
    }

    componentDidMount() {
        let scrollTop = this.container.scrollTop;
        this.container.scrollTop = 10;
        this.sweetScroll = new SweetScroll({}, this.container);
        this.container.scrollTop = scrollTop;

        let layout = this.computeLayout(this.props, this.container.offsetHeight);

        this.setState({
            containerHeight: this.container.offsetHeight,
            layout: layout
        });
        this.scrollTop = this.container.scrollTop;

        this.props.onPositionChange(this.props.position, layout);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.position.scrollTop)
            nextProps.position.scrollTop = this.getScrollTopOf(nextProps.position);
        let layout = this.computeLayout(nextProps);
        this.setState({layout});

        if (nextProps.position.force || nextProps.position.reflow)
            this.setState({forceScrollTop: true});
    }

    componentDidUpdate() {
        if (this.state.forceScrollTop) {
            this.sweetScroll.to(this.props.position.scrollTop);
            if (!this.props.position.reflow) {
                let layout = this.computeLayout(this.props);
                this.setState({layout});

                let position = _.omit(this.props.position, 'force');

                this.props.onPositionChange(position, layout);
            }

            this.setState({forceScrollTop: false});
        }
    }

    render() {
        let displayables = this.state.layout.map((attrs, i) => {
            let child = this.props.children[i];
            if (!React.isValidElement(child))
                child = this.props.placeholderFunc(`placeholder-${i}`, this.props.placeholderHeight);

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
                    {/* Stop margin collapsing, so that this element will reflect
                        the height of the content + 2px, including the margin */}
                    <div style={{padding: '1px 0', margin: '-1px 0'}}>
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
                scrollTop: 0,
                reflow: true
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

    getScrollTopOf(position) {
        let scrollTop = position.offset;
        for (let i = 0; i < position.index; i++)
            scrollTop += this.getHeightOf(this.props.children[i]);

        return scrollTop;
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

        if (position.scrollTop === 0 && (position.index !== 0 || position.offset !== 0)) {
            position.scrollTop = this.getScrollTopOf(position);
            position.force = true;
            this.props.onPositionChange(position, this.state.layout);
        } else if (position.index !== this.props.position.index) {
            // Only update if scrolling across item boundary
            this.props.onPositionChange(position, this.state.layout);
        }
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
        scrollTop: React.PropTypes.number,
        force: React.PropTypes.bool,
        reflow: React.PropTypes.bool
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

    preloadRatio: 4
};
