import { connect } from 'react-redux';
import _ from 'lodash';

import ReaderStream from './ReaderStream.jsx';
import {
    reportScroll, reportViewport
} from '../actions/stream';

const ReaderStreamContainer = connect(
    function stateToProps(state) {
        return _.extend(
            {},
            _.pick(state.stream,
                   'filter', 'filteredStream', 'position')
        );
    },
    function dispatchToProps(dispatch) {
        return {
            onReportScroll(position) {
                dispatch(reportScroll(position));
            },

            onReportViewport(viewport) {
                dispatch(reportViewport(viewport));
            }
        };
    }
)(ReaderStream);

ReaderStreamContainer.prototype.displayName = 'ReaderStreamContainer';

export default ReaderStreamContainer;
