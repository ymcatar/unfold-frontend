export const TOGGLE_SIDEBAR = 'ui: toggle side bar';
export let toggleSidebar = val => ({
    type: TOGGLE_SIDEBAR,
    sidebar: val
});


export const SWITCH_SIDEBAR = 'ui: switch side bar';
export let switchSidebar = val => ({
    type: SWITCH_SIDEBAR,
    sidebarActive: val
});

export const SELECT_EDITOR_POST = 'ui: select editor post';
export let selectEditorPost = val => ({
    type: SELECT_EDITOR_POST,
    editorPost: val
});
