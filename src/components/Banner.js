import React from 'react';

import '../styles/index.css';

const DEFAULT_MESSAGE = 'Доступна новая версия сервиса';
const DEFAULT_UPDATE_MESSAGE = 'Доступна новая версия сервиса';

export const Banner = ({ needUpdate, update, close, closeIcon, message = DEFAULT_MESSAGE, updateMessage = DEFAULT_UPDATE_MESSAGE}) => needUpdate && (
    <div className='version-check-banner'>
        <span className='version-check-icon' onClick={close}>
            {closeIcon}
        </span>
        { message } - <b className='version-check-update' onClick={update}>{ updateMessage }</b>
    </div>
);
