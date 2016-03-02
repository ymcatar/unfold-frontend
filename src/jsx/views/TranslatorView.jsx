import React from 'react';
import MediaQuery from 'react-responsive';

import Colors from 'config/Colors.jsx';

import TranslatorStream from 'stream/TranslatorStream.jsx';

import Timeline from 'timeline/Timeline.jsx';

import TranslatorInfo from 'info/TranslatorInfo.jsx';
import TranslatorHeader from 'header/TranslatorHeader.jsx';
import Editor from 'editor/Editor.jsx';

const styles = {
    main: {
        textColor: Colors.info.textColor,
        marginTop: '50px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'hidden'
    },
    stream: {
        width: '100%'
    }
};

export default class TranslatorView extends React.Component {
    render() {
        return (
            <div>
                <TranslatorHeader />
                <div style={styles.main}>
                    <Timeline type="stream" />
                    <div style={styles.stream}><TranslatorStream /></div>
                    <Editor type="stream" />
                </div>
            </div>
        );
    }
}
