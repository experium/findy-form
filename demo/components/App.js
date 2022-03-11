import React, { Component } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import VersionCheck, { Banner } from '../../src/index';

export default class App extends Component {
    render() {
        return <div>
            <h1>Demo index version check lib</h1>
            <VersionCheck interval={1}>
                { props => (
                    <Banner {...props} closeIcon={<CloseOutlined />} />
                )}
            </VersionCheck>
        </div>;
    }
}
