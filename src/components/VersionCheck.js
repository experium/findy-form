import React, { useEffect, useState } from 'react';

import { Message } from './Banner';

const VersionCheck = ({
    interval = 10,
    indexRoute = '/index.html',
    message,
    updateMessage,
    children
}) => {
    const [needUpdate, setNeedUpdate] = useState(false);

    useEffect(() => {
        let intervalId; let
            indexPage;

        const getIndexPage = () => {
            fetch(indexRoute, { method: 'GET' })
                .then(response => {
                    if (response && response.ok) {
                        response.text().then(html => {
                            if (indexPage) {
                                if (html !== indexPage) {
                                    clearInterval(intervalId);
                                    setNeedUpdate(true);
                                }
                            } else {
                                indexPage = html;
                            }
                        });
                    }
                })
                .catch(error => console.log(error));
        };

        getIndexPage();

        intervalId = setInterval(() => {
            getIndexPage();
        }, parseInt(1000 * 60 * interval, 10) || 1000 * 60 * 10);

        return () => {
            clearInterval(intervalId);
        };
    }, [interval]);

    const update = () => {
        window.location.reload();
    };

    const close = (e) => {
        e.stopPropagation();
        setNeedUpdate(false);
    };

    return needUpdate ?
        typeof children === 'function' ? children({ needUpdate, update, close }) : children || (
            <Message needUpdate={needUpdate} update={update} close={close} message={message} updateMessage={updateMessage} />
        ) : null;
};

export default VersionCheck;
