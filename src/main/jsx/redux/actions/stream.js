export const SELECT_FILTER = 'stream: select filter';
export let selectFilter = filter => ({ type: SELECT_FILTER, filter });

export const SCROLL_TO = 'stream: scroll to';
export let scrollTo = position => ({ type: SCROLL_TO, position });

export const RESET_SCROLL = 'stream: reset scroll';
export let resetScroll = () => ({ type: RESET_SCROLL });
