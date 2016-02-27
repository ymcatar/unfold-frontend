export const SELECT_FILTER = 'stream: select filter';

export function selectFilter(filter) {
    return {
        type: SELECT_FILTER,
        filter: filter
    };
}

export const SCROLL_TO = 'stream: scroll to';

export function scrollToDate(date) {
    return {
        type: SCROLL_TO,
        date: date
    };
}

export function scrollToTop() {
    return {
        type: SCROLL_TO,
        top: true
    };
}

export const REPORT_SCROLL = 'stream: report scroll';

export function reportScroll(position) {
    return {
        type: REPORT_SCROLL,
        position: position
    };
}

export const REPORT_VIEWPORT = 'stream: report viewport';

export function reportViewport(viewport) {
    return {
        type: REPORT_VIEWPORT,
        viewport: viewport
    };
}

// For prototyping purpose only
export const CREATE_POST = 'stream create post';

export function createPost(post) {
    return {
        type: CREATE_POST,
        post: post
    };
}
