export const SHOW_ERROR = 'modal: show error';
export let showError = msg => ({
    type: SHOW_ERROR,
    active: 'error',
    data: msg
});

export const HIDE_ERROR = 'modal: hide error';
export let hideError = () => ({
    type: HIDE_ERROR,
    active: null,
    data: null
});

export const SHOW_READER_MAIL = 'modal: show reader mail';
export let showReaderMail = () => ({
    type: SHOW_READER_MAIL,
    active: 'readerMail',
    data: null
});

export const HIDE_READER_MAIL = 'modal: hide reader mail';
export let hideReaderMail = () => ({
    type: HIDE_READER_MAIL,
    active: null,
    data: null
});

export const SHOW_READER_PROOF = 'modal: show reader proof';
export let showReaderProof = data => ({
    type: SHOW_READER_PROOF,
    active: 'readerProof',
    data: data
});

export const HIDE_READER_PROOF = 'modal: hide reader proof';
export let hideReaderProof = () => ({
    type: HIDE_READER_PROOF,
    active: null,
    data: null
});

export const SHOW_READER_SETTINGS = 'modal: show reader settings';
export let showReaderSettings = () => ({
    type: SHOW_READER_SETTINGS,
    active: 'readerSettings',
    data: null
});

export const HIDE_READER_SETTINGS = 'modal: hide reader settings';
export let hideReaderSettings = () => ({
    type: HIDE_READER_SETTINGS,
    active: null,
    data: null
});

export const SHOW_LOGIN = 'modal: show login';
export let showLogin = () => ({
    type: SHOW_LOGIN,
    active: 'login',
    data: null
});

export const HIDE_LOGIN = 'modal: hide login';
export let hideLogin = () => ({
    type: HIDE_LOGIN,
    active: null,
    data: null
});
