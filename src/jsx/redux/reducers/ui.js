import _ from 'lodash';

import * as actions from '../actions/ui';

const initialState = { sidebar: true };

export default function reduceStream(state, action) {
	let { ui } = state;
	ui = ui || initialState;

	switch (action.type) {
		case actions.TOGGLE_SIDEBAR:
			ui = { sidebar: action.sidebar };
			break;
	}

	return _.defaults({ ui: _.defaults(ui, state.ui) }, state);
}
