import stream from './stream';
import raw from './raw';
import modal from './modal';
import ui from './ui';
import ajax from './ajax';

export default function reducer(state, action) {
    state = state || {};
    state = stream(state, action);
    state = raw(state, action);
    state = modal(state, action);
    state = ui(state, action);
    state = ajax(state, action);
    return state;
}
