import _ from 'lodash';

import * as actions from '../actions/modal';

const initialState = { active: null, data: null };

export default function reduceStream(state, action) {
	let { modal } = state;
	modal = modal || initialState;

	switch (action.type) {

		case actions.SHOW_ERROR:
		case actions.HIDE_ERROR:

		case actions.SHOW_SUCCESS:
		case actions.HIDE_SUCCESS:

		case actions.SHOW_READER_MAIL:
		case actions.HIDE_READER_MAIL:

		case actions.SHOW_READER_PROOF:
		case actions.HIDE_READER_PROOF:

		case actions.SHOW_READER_SETTINGS:
		case actions.HIDE_READER_SETTINGS:

		case actions.SHOW_LOGIN:
		case actions.HIDE_LOGIN:

		case actions.SHOW_PROFILE:
		case actions.HIDE_PROFILE:
		
			modal = { active: action.active, data: action.data };
			break;
	}

	return _.defaults({ modal: _.defaults(modal, state.modal) }, state);
}
