import React, { Component } from 'react';
import { prop, append, remove, isEmpty, path, pathOr, join, values, keys, last } from 'ramda';
import Modal from 'react-responsive-modal';
import { withTranslation } from 'react-i18next';
import getusermedia from 'getusermedia';

import withFieldWrapper from '../hocs/withFieldWrapper';
import ImageFile from './ImageFile';
import VideoFile from './VideoFile';
import AudioFile from './AudioFile';
import styles from '../../styles/index.module.css';
import formStyles from '../../styles/index.module.css';
import Spinner from './Spinner';
import { getFileErrorText } from '../../utils/file';
import { TYPES } from '../../constants/allowFileExtensions';
import { checkFileType, getFileTypeMessage } from '../../utils/validation';

const FILE_TYPES = {
    image: 'image',
    video: 'video',
    audio: 'audio',
    document: 'document',
};

const MEDIA = {
    [FILE_TYPES.audio]: { audio: true },
    [FILE_TYPES.video]: { audio: true, video: true },
    [FILE_TYPES.image]: { video: true }
};

const MODAL_CONTENT = {
    [FILE_TYPES.audio]: AudioFile,
    [FILE_TYPES.video]: VideoFile,
    [FILE_TYPES.image]: ImageFile
};

const BTN_TEXT = {
    [FILE_TYPES.audio]: 'recordAudio',
    [FILE_TYPES.video]: 'recordVideo',
    [FILE_TYPES.image]: 'takePhoto'
};

class File extends Component {
    state = {
        loading: false,
        error: false,
        available: false,
        visibleModal: false,
        fileNames: {},
    };

    onSave = file => {
        if (file) {
            const { postFileUrl, settings, getFileUrl, input: { value, name }, onChange, t, allowFileExtensions, setInputError } = this.props;
            const multiple = prop('multiple', settings);
            const type = prop('type', settings);
            const fd = new FormData();
            const fileExtenstion = last(`${file.name}`.split('.'));
            const validFileType = checkFileType(type, file.type, fileExtenstion, allowFileExtensions);

            fd.append('file', file);
            fd.append('name', file.name);

            if (validFileType) {
                this.setState({ loading: true, error: false });
                setInputError(undefined);

                fetch(postFileUrl, {
                    method: 'POST',
                    body: fd
                })
                    .then(response => {
                        if (!response.ok && response.status !== 400) {
                            throw new Error();
                        } else {
                            return response.json();
                        }
                    })
                    .then(data => {
                        const { input: { name } } = this.props;
                        const fileName = data.filename;

                        if (data.statusCode === 400) {
                            setInputError(getFileErrorText(data.message));
                            return this.setState({ error: data.message || true, loading: false });
                        }

                        if (!data.id) {
                            return this.setState({ error: true, loading: false });
                        }

                        const url = getFileUrl ? getFileUrl(data.id) : data.id;
                        this.setState({ loading: false });

                        const fileItem = {
                            url,
                            text: fileName,
                            extenstion: fileExtenstion,
                            contentType: file.type,
                            type,
                        };

                        if (multiple) {
                            const fieldFiles = pathOr([], ['fileNames', name], this.state);
                            this.setState({ fileNames: {
                                [name]: [...fieldFiles, fileName],
                            }});
                            onChange(append(fileItem, value || []));
                        } else {
                            this.setState({ fileNames: {
                                [name]: [fileName],
                            }});
                            onChange(fileItem);
                        }
                    })
                    .catch((error) => {
                        setInputError(getFileErrorText(error));
                        this.setState({ error: true });
                    });
            } else {
                const fileItem = {
                    text: file.name,
                    extenstion: fileExtenstion,
                    contentType: file.type,
                    type,
                };

                setInputError(getFileTypeMessage(type, allowFileExtensions));
                if (multiple) {
                    const fieldFiles = pathOr([], ['fileNames', name], this.state);
                    this.setState({
                        error: true,
                        fileNames: {
                            [name]: [...fieldFiles, fileItem.text],
                        }
                    });
                    onChange(append(fileItem, value || []));
                } else {
                    this.setState({
                        error: true,
                        fileNames: {
                            [name]: [fileItem.text],
                        }
                    });
                    onChange(fileItem);
                }
            }
        }
    }

    onChange = e => {
        const file = e.target.files[0];

        this.onSave(file);
    }

    onDelete = (index) => {
        const { input: { value, name }, setInputError, onChange } = this.props;
        const fieldFiles = path(['fileNames', name], this.state);

        setInputError(undefined);

        this.setState({
            error: false,
            fileNames: {
                [name]: remove(index, 1, fieldFiles),
            },
        });

        if (Array.isArray(value)) {
            const newFieldValue = remove(index, 1, value);

            onChange(isEmpty(newFieldValue) ? undefined : newFieldValue);
        } else {
            onChange(undefined);
        }
    }

    openModal = () => {
        if (!this.state.available) {
            const { type } = this.props.settings || {};

            getusermedia(MEDIA[type], (error, stream) => {
                if (error) {
                    this.setState({ visibleModal: true });
                } else {
                    this.stream = stream;
                    this.setState({ visibleModal: true, available: true });
                }
            });
        } else {
            this.setState({ visibleModal: true });
        }
    }

    closeModal = () => {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        this.setState({ visibleModal: false });
    }

    onSaveModalContent = file => {
        this.onSave(file);
        this.closeModal();
    }

    renderPreview = (url, index, type) => {
        const { input: { name } } = this.props;
        const fileName = path(['fileNames', name, index], this.state);
        const isBlob = fileName === 'blob';

        switch (type) {
            case FILE_TYPES.image:
                return (
                    <div>
                        { isBlob ? (
                            <img className={styles.imagePreview} src={url} alt='file' />
                        ) : fileName}
                    </div>
                );
            case FILE_TYPES.video:
                return (
                    <div>
                        { isBlob ? (
                            <video key={url} height={200} controls>
                                <source src={url} type='video/webm' />
                            </video>
                        ) : fileName}
                    </div>
                );
            case FILE_TYPES.audio:
                return (
                    <div>
                        { isBlob ? (
                            <audio controls key={url}>
                                <source src={url} />
                            </audio>
                        ) : fileName}
                    </div>
                );
            default:
                return (
                    <div>
                        { fileName }
                    </div>
                );
        }
    }

    getAccept = (type) => {
        const { allowFileExtensions } = this.props;

        if (allowFileExtensions) {
            return allowFileExtensions[type] ? (
                `.${join(', .', keys(allowFileExtensions[type]))}`
            ) : TYPES[type];
        } else {
            return TYPES[type];
        }
    }

    render() {
        const { settings, input: { value, name }, t, disabled } = this.props;
        const { type, multiple } = settings || {};
        const values = value ? (multiple ? value : [value]) : [];
        const ModalContent = MODAL_CONTENT[type];
        const { loading, error } = this.state;

        return <div id={`${name}-file`}>
            { !isEmpty(value) && (
                <div className={styles.fileList}>
                    { values.map(({ url }, index) =>
                        <div className={styles.fileItem} key={`file-${index}`}>
                            { this.renderPreview(url, index, type) }
                            <div className={styles.fileButtonGroup}>
                                { !!url && (
                                    <a
                                        className={`${styles.downloadButton} ${disabled ? styles.downloadButtonDisabled : ''}`}
                                        href={disabled ? undefined : url}
                                        download
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        { t('download') }
                                    </a>
                                )}
                                <button
                                    disabled={disabled}
                                    className={`${styles.dangerBtn} ${disabled ? styles.dangerBtnDisabled : ''}`}
                                    type='button'
                                    onClick={() => this.onDelete(index)}
                                >
                                    { t('remove') }
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className={styles.fileControls}>
                { !multiple && value.length > 1 ? null :
                    <div>
                        <input
                            className={styles.fileInput}
                            id={name}
                            type='file'
                            value=''
                            onChange={this.onChange}
                            accept={this.getAccept(type)}
                            disabled={disabled || loading && !error}
                        />
                        <label htmlFor={name} className={`${disabled ? 'disabled' : ''}`}>
                            { loading && !error && <Spinner /> }
                            <span className='button-text'>
                                {t('upload')}
                            </span>
                        </label>
                    </div>
                }
                { (!multiple && value.length > 1) || !BTN_TEXT[type] ? null : (
                    type && (
                        <button disabled={loading && !error || disabled} className={formStyles.formBtn} type='button' onClick={this.openModal}>
                            { t(BTN_TEXT[type]) }
                        </button>
                    )
                )}
            </div>
            { MODAL_CONTENT[type] && (
                <Modal
                    center
                    open={this.state.visibleModal}
                    onClose={this.closeModal}
                    classNames={{
                        modal: 'modal',
                        closeButton: 'modalCloseButton',
                    }}
                >
                    <ModalContent
                        key={this.state.available}
                        available={this.state.available}
                        onChange={this.onSaveModalContent} />
                </Modal>
            )}
        </div>;
    }
}

export default withFieldWrapper(withTranslation()(File));
