export const TOGGLE_SIDEBAR = 'ui: show side bar';
export let toggleSidebar = val => ({
    type: TOGGLE_SIDEBAR,
    sidebar: val
});
