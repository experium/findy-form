import React, { Component } from 'react';
import { CloseOutlined, WarningOutlined } from '@ant-design/icons';

import VersionCheck, { Banner } from '../../src/index';

export default class App extends Component {
    render() {
        return <div>
            <h1>Demo index version check lib</h1>
            <VersionCheck interval={0.1}>
                { props => (
                    <Banner {...props} icon={<WarningOutlined />} closeIcon={<CloseOutlined />} />
                )}
            </VersionCheck>
        </div>;
    }
}
