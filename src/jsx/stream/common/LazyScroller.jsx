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

let perfLog = () => {};

export default class LazyScroller extends React.Component {
    constructor(props) {
        super(props);

        if (!props.position.scrollTop)
            props.position.scrollTop = this.getScrollTopOf(props.position);

        this.state = {
            containerHeight: 1000,
            heightCache: {},
            rendered: {},
            forceScrollTop: false
        };
        _.extend(this.state, this.computeState(props, 1000));

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

        let nextState = this.computeState(this.props, this.container.offsetHeight);
        this.setState(_.extend(nextState, {
            containerHeight: this.container.offsetHeight
        }));

        this.scrollTop = this.container.scrollTop;

        this.props.onLayoutChange(nextState.layout);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.position.scrollTop)
            nextProps.position.scrollTop = this.getScrollTopOf(nextProps.position);
        this.setState(this.computeState(nextProps));

        if (nextProps.position.force || nextProps.position.reflow)
            this.setState({forceScrollTop: true});
    }

    componentDidUpdate() {
        if (this.state.forceScrollTop) {
            this.sweetScroll.to(this.props.position.scrollTop);
            perfLog('setState to unforce');
            this.setState({
                position: _.omit(this.props.position, 'force', 'reflow'),
                forceScrollTop: false
            });
        }
    }

    render() {
        let total = 0, hidden = 0;
        let keys = _.keys(this.state.rendered).sort();
        let displayables = keys.map(key => {
            total += 1;
            if (!this.state.layout[key]) hidden += 1;
            let attrs = this.state.rendered[key];

            let child = attrs.item;
            if (!React.isValidElement(child))
                child = this.props.placeholderFunc(`placeholder-${key}`,
                                                   this.props.placeholderHeight);

            let styles = {
                display: this.state.layout[key] ? 'block' : 'none',
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
                    ref={this.onReportHeight.bind(this, key)}>
                    {/* Stop margin collapsing, so that this element will reflect
                        the height of the content + 2px, including the margin */}
                    <div style={{padding: '1px 0', margin: '-1px 0'}}>
                        {React.cloneElement(child, {
                            onResize: this.onUpdateHeight.bind(this, key)
                        })}
                    </div>
                </div>
            );
        });
        perfLog('RENDER: ', hidden, '/', total, 'hidden');

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

    onReportHeight(key, node) {
        if (node)
            this.itemRefs[key] = node;
        else
            return;

        if (typeof this.state.heightCache[key] === 'undefined') {
            this.state.heightCache[key] = node.firstElementChild.offsetHeight;
            perfLog('relayout for ', key);
            this.debouncedRelayout();
        }
    }

    onUpdateHeight(key) {
        let node = this.itemRefs[key];
        if (!node) return;

        this.state.heightCache[key] = node.firstElementChild.offsetHeight;
        perfLog('relayout for update ', key);
        this.debouncedRelayout();
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

    computeState(props, containerHeight = this.state.containerHeight) {
        let {position, children, preloadRatio} = props;

        let layout = {};

        let addChild = (child, at, bottom) => {
            let key = child ? child.key : undefined;
            let height = this.getHeightOf(child);
            let top = at - (bottom ? height : 0);
            layout[key] = {
                key: key,
                item: child,
                top: top,
                height: height
            };
            return at + (bottom ? -1 : 1) * height;
        };

        let at = position.scrollTop - position.offset;
        let end = position.scrollTop + containerHeight * (preloadRatio + 1);
        for (let i = position.index; i < children.length && at < end; i++)
            at = addChild(children[i], at);

        at = position.scrollTop - position.offset;
        end = position.scrollTop - containerHeight * preloadRatio;
        for (let i = position.index - 1; i >= 0 && at > end; i--)
            at = addChild(children[i], at, true);

        let rendered = this.state.rendered;
        _.forEach(layout, (v, k) => {
            rendered[k] = v;
        });

        return {layout, rendered};
    }

    relayout() {
        perfLog('setState to relayout');
        this.setState(this.computeState(this.props));
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
            this.props.onPositionChange(position);

        } else if (position.index !== this.props.position.index) {
            // Only update if scrolling across item boundary
            this.props.onPositionChange(position);

            let nextState = this.computeState(this.props, this.container.offsetHeight);
            perfLog('setState for crossing boundary');
            this.setState(nextState);
            this.props.onLayoutChange(nextState.layout);
        }
    }
}

LazyScroller.propTypes = {
    children: React.PropTypes.arrayOf(
        React.PropTypes.element
    ).isRequired,

    position: React.PropTypes.shape({
        index: React.PropTypes.number.isRequired,
        offset: React.PropTypes.number.isRequired,
        scrollTop: React.PropTypes.number,
        force: React.PropTypes.bool,
        reflow: React.PropTypes.bool
    }),
    onPositionChange: React.PropTypes.func,
    onLayoutChange: React.PropTypes.func,

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
    onLayoutChange: () => {},

    placeholderFunc: function placeholder(key, height) {
        return <div key={key} style={{height: height}} />;
    },
    placeholderHeight: 300,

    preloadRatio: 4
};
