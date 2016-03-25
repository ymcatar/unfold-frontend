import event from './event';
import stream from './stream';
import raw from './raw';
import modal from './modal';
import ui from './ui';

export default function reducer(state, action) {
    state = state || {};
    state = event(state, action);
    state = stream(state, action);
    state = raw(state, action);
    state = modal(state, action);
    state = ui(state, action);
    return state;
}
