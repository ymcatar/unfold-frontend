import { connect } from 'react-redux';
import _ from 'lodash';

import ReaderInfo from './ReaderInfo.jsx';

const ReaderInfoContainer = connect(
    function stateToProps(state) {
        return _.extend(
            {},
            state.event
        );
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(ReaderInfo);

ReaderInfoContainer.prototype.displayName = 'ReaderInfoContainer';

export default ReaderInfoContainer;
