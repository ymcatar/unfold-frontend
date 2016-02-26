import { connect } from 'react-redux';

import ReaderHeader from './ReaderHeader.jsx';
import { selectFilter, scrollToTop } from '../actions/stream';

const ReaderHeaderContainer = connect(
    function stateToProps(state) {
        return {
        };
    },
    function dispatchToProps(dispatch) {
        return {
            handleFilter(filter) {
                dispatch(selectFilter(filter));
            },

            handleBackToTop() {
                dispatch(scrollToTop());
            }
        };
    }
)(ReaderHeader);

ReaderHeaderContainer.prototype.displayName = 'ReaderHeaderContainer';

export default ReaderHeaderContainer;
