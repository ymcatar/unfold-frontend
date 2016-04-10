export const STORE_EVENT_ID = 'ui: store event id';
export let storeEventId = val => ({ type: STORE_EVENT_ID, eventId: val });

export const STORE_READER_SETTINGS = 'ui: store reader settings';
export let storeReaderSettings = data => ({ type: STORE_READER_SETTINGS, data });

export const TOGGLE_SIDEBAR = 'ui: toggle side bar';
export let toggleSidebar = val => ({ type: TOGGLE_SIDEBAR, sidebar: val });


export const SWITCH_SIDEBAR = 'ui: switch side bar';
export let switchSidebar = val => ({ type: SWITCH_SIDEBAR, sidebarActive: val });

export const SELECT_EDITOR_POST = 'ui: select editor post';
export let selectEditorPost = val => ({ type: SELECT_EDITOR_POST, editorPost: val });

export const SHOW_ERROR_PAGE = 'ui: show error page';
export let showErrorPage = () => ({ type: SHOW_ERROR_PAGE });
