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

let perfLog = _.noop || console.info.bind(console);

function shallowEqualExcept(a, b, ...except) {
    for (let k in a) {
        if (!a.hasOwnProperty(k)) continue;
        if (except.indexOf(k) !== -1) continue;
        if (a[k] !== b[k]) return false;
    }
    for (let k in b) {
        if (!b.hasOwnProperty(k)) continue;
        if (except.indexOf(k) !== -1) continue;
        if (a[k] !== b[k]) return false;
    }
    return true;
}

export default class LazyScroller extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.computeNextState(props, {
            containerHeight: 1000,
            position: _.extend({ scrollTop: 0, scrollSpeed: 0 }, props.position),
            heightCache: {},
            layout: {},
            rendered: {}
        });

        this.container = null;
        this.sweetScroll = null;
        this.itemRefs = {};

        this.lastScrollTime = Date.now();

        this.boundOnReportHeight = {};
        this.boundOnUpdateHeight = {};

        this.debouncedRelayout = _.debounce(this.relayout.bind(this), 50, { leading: true, maxWait: 50 });
        this.debounceOnScrollEnd = _.debounce(this.onScrollEnd.bind(this), 50);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        // Set up SweetScroll
        let scrollTop = this.container.scrollTop;
        this.container.scrollTop = 10;
        this.sweetScroll = new SweetScroll({ easing: 'easeInOutCirc' }, this.container);
        if (!this.sweetScroll.container)
            console.error('SweetScroll error!');
        this.container.scrollTop = scrollTop;

        // Update containerHeight now that its ref is available
        this.onContainerResize();
    }

    componentWillReceiveProps(nextProps) {
        // Calculate layout
        this.setState(this.computeNextState(nextProps, {
            position: _.extend(this.state.position, nextProps.position),
            scrollSpeed: nextProps.position.scrollSpeed || this.state.scrollSpeed
        }));
    }

    shouldComponentUpdate(nextProps, nextState) {
        let ret = !shallowEqualExcept(this.props, nextProps);
        // if (!ret)
        //     perfLog('not updating');
        return ret;
    }

    componentDidUpdate() {
        if (this.state.position.force) {
            if (this.state.position.animate === false)
                this.container.scrollTop = this.state.position.scrollTop;
            else
                this.sweetScroll.to(this.state.position.scrollTop);

            perfLog('setState to unforce');
            this.setState({position: _.omit(this.state.position, 'force', 'animate')});
        }

        // Check the height of all visible items
        let updated = false;
        _.forEach(this.state.layout, (attrs, key) => {
            if (!attrs.visible) return;
            let node = this.itemRefs[key];
            if (!node) return;

            let height = node.firstElementChild.offsetHeight;
            if (height !== this.state.heightCache[key]) {
                this.state.heightCache[key] = height;
                updated = true;
            }
        });
        if (updated)
            this.debouncedRelayout();
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
                child = this.props.placeholderFunc(`placeholder-${key}`,this.props.placeholderHeight);

            let styles = {
                display: this.state.layout[key] ? 'block' : 'none',
                position: 'absolute',
                top: attrs.top,
                width: '100%',
                height: this.getHeightOf(child),
                overflowY: 'hidden'
            };

            let onReportHeight = this.boundOnReportHeight[key] ||
                (this.boundOnReportHeight[key] = this.onReportHeight.bind(this, key));
            let onUpdateHeight = this.boundOnUpdateHeight[key] ||
                (this.boundOnUpdateHeight[key] = this.onUpdateHeight.bind(this, key));

            return (
                <div key={child.key} style={styles} ref={onReportHeight}>
                    {/* Stop margin collapsing, so that this element will reflect
                        the height of the content + 2px, including the margin */}
                    <div style={{padding: '1px 0', margin: '-1px 0'}}>
                        {React.cloneElement(child, { onResize: onUpdateHeight })}
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
                style={_.extend({}, this.props.style, styles.main)}
                onScroll={this.onScroll}
                ref={elm => { this.container = elm; }}>
                <div style={_.extend({height: bodyHeight}, styles.body)}>
                    {displayables}
                </div>
            </div>
        );
    }

    onReportHeight(key, node) {
        this.itemRefs[key] = node;

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

    onContainerResize() {
        let nextState = this.computeNextState(this.props, {
            containerHeight: this.container.offsetHeight
        });
        this.props.onLayoutChange(nextState.layout);
    }

    computeNextState(props, state) {
        _.defaults(state, this.state);

        let {position, children, preloadRatio} = props;
        let {containerHeight} = state;

        let getHeightOf = child => {
            return child && child.props.height || state.heightCache[child.key] || props.placeholderHeight;
        };

        let scrollTop = state.position.scrollTop;
        if (state.position.force) {
            perfLog('reflow in layout');
            scrollTop = position.offset;
            for (let i = 0; i < position.index; i++)
                scrollTop += getHeightOf(props.children[i]);
            state.position = _.defaults({scrollTop}, position);
        }

        let layout = {};
        let rendered = state.rendered;

        let visibleTop = scrollTop - containerHeight;
        let visibleBottom = scrollTop + containerHeight;

        let addChild = (child, at, bottom) => {
            let key = child ? child.key : undefined;
            let height = getHeightOf(child);
            let top = at - (bottom ? height : 0);
            rendered[key] = layout[key] = {
                key: key,
                item: child,
                top: top,
                height: height,
                visible: top >= visibleTop && top <= visibleBottom
            };
            return at + (bottom ? -1 : 1) * height;
        };

        let at = scrollTop - position.offset;
        let end = scrollTop + containerHeight * (preloadRatio + 1);
        for (let i = position.index; i < children.length && at < end; i++)
            at = addChild(children[i], at);

        at = scrollTop - position.offset;
        end = scrollTop - containerHeight * preloadRatio;
        for (let i = position.index - 1; i >= 0 && at > end; i--)
            at = addChild(children[i], at, true);

        _.extend(state, {layout, rendered});

        return state;
    }

    relayout() {
        perfLog('setState due to relayout');
        this.setState(this.computeNextState(this.props, {}));
    }

    getHeightOf(child) {
        return (child && child.props.height || this.state.heightCache[child.key] || this.props.placeholderHeight);
    }

    onScroll() {
        // TODO: use event value
        let scrollTop = this.container.scrollTop;
        let children = this.props.children;

        // Calculate the new position
        let {index, offset} = this.state.position;
        offset += scrollTop - this.state.position.scrollTop;

        let height;
        while (offset > (height = this.getHeightOf(children[index])) &&
               index < children.length - 1) {
            index += 1;
            offset -= height;
        }
        while (offset < 0 && index > 0) {
            index -= 1;
            offset += this.getHeightOf(children[index]);
        }

        let now = Date.now();
        let scrollSpeed = (scrollTop - this.state.position.scrollTop) / (now - this.lastScrollTime) * 1000;
        scrollSpeed = ((this.state.position.scrollSpeed * 4) + scrollSpeed) / 5;
        this.lastScrollTime = now;
        this.debounceOnScrollEnd();

        // console.log('scrollSpeed:', scrollSpeed);

        // Emit event if needed
        if (offset < 0) {
            perfLog('onPositionChange due to extra top space');
            this.props.onPositionChange({index: 0, offset: 0, force: true, animate: false});

        } else if (scrollTop === 0 && (index !== 0 || offset !== 0)) {
            perfLog('onPositionChange due to invisible top items');
            this.props.onPositionChange({index, offset, scrollSpeed, force: true, animate: false});

        } else if (index !== this.state.position.index) {
            perfLog('onPositionChange due to crossing boundary');
            this.props.onPositionChange({index, offset, scrollTop, scrollSpeed});

        } else {
            let position = {index, offset, scrollTop, scrollSpeed};
            this.setState({position});
        }
    }

    onScrollEnd() {
        // console.log('onScrollEnd: at', this.state.position.scrollTop);
        let {index, offset} = this.state.position;
        this.props.onPositionChange({index, offset, scrollSpeed: 0});
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
        animate: React.PropTypes.bool
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
        offset: 0
    },
    onPositionChange: () => {},
    onLayoutChange: () => {},

    placeholderFunc: function placeholder(key, height) {
        return <div key={key} style={{height: height}} />;
    },
    placeholderHeight: 300,

    preloadRatio: 4
};
