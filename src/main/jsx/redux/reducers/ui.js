import _ from 'lodash';

import * as actions from '../actions/ui';

const initialState = {
	sidebar: true,
 	sidebarActive: 'event'
};

export default function reduceStream(state, action) {
	let { ui } = state;
	ui = ui || initialState;

	switch (action.type) {
		case actions.STORE_EVENT_ID:
			ui = { eventId: action.eventId };
			break;
		case actions.TOGGLE_SIDEBAR:
			ui = { sidebar: action.sidebar };
			break;
		case actions.SWITCH_SIDEBAR:
			ui = { sidebarActive: action.sidebarActive };
			break;
		case actions.SELECT_EDITOR_POST:
			ui = { editorPost: action.editorPost };
			break;
	}

	return _.defaults({ ui: _.defaults(ui, state.ui) }, state);
}
