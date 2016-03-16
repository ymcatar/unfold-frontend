export const SHOW_READER_MAIL = 'modal: show reader mail';
export let showReaderMail = () => ({
    type: SHOW_READER_MAIL,
    active: 'readerMail',
    data: data
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
