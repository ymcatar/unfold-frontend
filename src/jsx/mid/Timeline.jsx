import React from 'react';

import Bar from 'mid/common/Bar.jsx';

const styles = {
    main: {
        padding: '20px 0 5px 0',
    }
};

export default class Timeline extends React.Component {
    render() {

        let bars = [];
        let random = () => (Math.floor(Math.random() * 100));
        for (let i = 0; i < 100; i++)
            bars.push((<Bar length={random()} heavier={i % 24 === 0} />));

        return (
            <div style={styles.main}>
                {bars}
            </div>
        );
    }
}
