export const SELECT_FILTER = 'stream: select filter';

export let selectFilter = filter => ({ type: SELECT_FILTER, filter: filter });

export const SELECT_ADDEDPOST = 'stream: select addedpost';
export let selectAddedPost = post => ({ type: SELECT_ADDEDPOST, addedPost: post });

export const SCROLL_TO = 'stream: scroll to';
export let scrollToDate = date => ({ type: SCROLL_TO, date });
export let scrollToTop = date => ({ type: SCROLL_TO, top: true });

export const REPORT_SCROLL = 'stream: report scroll';
export let reportScroll = position => ({ type: REPORT_SCROLL, position });

export const REPORT_VIEWPORT = 'stream: report viewport';
export let reportViewport = viewport => ({ type: REPORT_VIEWPORT, viewport });

// For prototyping purpose only
export const CREATE_POST = 'stream create post';
export let createPost = post => ({ type: CREATE_POST, post });
