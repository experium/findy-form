import React, { useEffect } from 'react';
import { message } from 'antd';

import '../styles/index.css';

const DEFAULT_MESSAGE = 'Доступна новая версия';
const DEFAULT_UPDATE_MESSAGE = 'обновить';

export const Banner = ({ needUpdate, update, close, icon, closeIcon, message = DEFAULT_MESSAGE, updateMessage = DEFAULT_UPDATE_MESSAGE}) => needUpdate && (
    <div className='version-check-banner'>
        { closeIcon && (
            <span className='version-close-icon' onClick={close}>
                {closeIcon}
            </span>
        )}
        { icon && (
            <span className='version-icon'>{icon}</span>
        )} { message } - <a className='version-check-update' onClick={update}>{ updateMessage }</a>
    </div>
);

export const Message = ({ needUpdate, update, message: text = DEFAULT_MESSAGE, updateMessage = DEFAULT_UPDATE_MESSAGE }) => {
    useEffect(() => {
        if (needUpdate) {
            message.warning({
                content: (
                    <span>{ text } - <a onClick={update}>{ updateMessage }</a></span>
                ),
                duration: 0,
            });
        }
    }, [needUpdate]);

    return null;
};
