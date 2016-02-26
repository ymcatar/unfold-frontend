import { connect } from 'react-redux';

import Timeline from './Timeline.jsx';
import { scrollToDate } from '../actions/stream';

const TimelineContainer = connect(
    function stateToProps(state) {
        return {
            data: state.stream.filteredStream
        };
    },
    function dispatchToProps(dispatch) {
        return {
            onTravel(date) {
                dispatch(scrollToDate(date));
            }
        };
    }
)(Timeline);

TimelineContainer.prototype.displayName = 'TimelineContainer';

export default TimelineContainer;
