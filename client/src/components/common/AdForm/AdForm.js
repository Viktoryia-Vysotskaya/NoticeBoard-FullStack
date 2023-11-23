import { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { FiX } from 'react-icons/fi';

import removeTags from '../../../utils/removeTags';
import { getRequest } from '../../../redux/adsRedux';
import styles from './AdForm.module.scss';

const AdForm = ({ action, actionText, ...props }) => {
    const [contentError, setContentError] = useState(false);
    const [photoError, setPhotoError] = useState(false);

    const request = useSelector(getRequest);

    const disabledSubmit = photoError;

    const [title, setTitle] = useState(props.title || '');
    const [content, setContent] = useState(props.content || '');
    const [localization, setLocalization] = useState(props.localization || '');
    const [price, setPrice] = useState(props.price || '');
    const [photo, setPhoto] = useState(props.photo || null);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const publicationDate = today.toLocaleDateString();

    const handleSubmit = (e) => {
        if (removeTags(content).length < 20 || removeTags(content).length > 500) {
            setContentError(true);
        } else {
            setContentError(false);
            const fd = new FormData();
            fd.append('title', title);
            fd.append('localization', localization);
            fd.append('content', content);
            fd.append('price', price);
            fd.append('publicationDate', publicationDate);
            fd.append('photo', photo);
            action(fd);
        }
    };

    const handleRemovePhoto = () => {
        setPhoto(null);
        setPreviewPhoto(null);

        // Reset state input[type='file']
        const fileInput = document.getElementById('formPhoto');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleFileChange = (e) => {
        setPhotoError(false);
        if (e.target.files.length > 0 && e.target.files[0].size < 1000000) {
            setPhoto(e.target.files[0]);
            setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
        } else {
            setPhotoError(true);
        }
    };

    const {
        register,
        handleSubmit: validate,
        formState: { errors },
    } = useForm();

    if (request.pending) {
        return <Spinner />;
    }
    return (
        <Form onSubmit={validate(handleSubmit)} className={styles.adForm}>
            <Form.Group controlId='formTitle' className={styles.formGroup}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    {...register('title', {
                        required: true,
                        minLength: 3,
                        maxLength: 50,
                    })}
                    type='text'
                    placeholder='Type your title here...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                    <small className='d-block form-text text-danger mt-2'>
                        This field is required! Minimum 3 signs, max 50 signs.
                    </small>
                )}
            </Form.Group>

            <Form.Group controlId='formLocalization' className={styles.formGroup}>
                <Form.Label>Localization</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter your localization...'
                    value={localization}
                    onChange={(e) => setLocalization(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='formContent' className={styles.formGroup}>
                <Form.Label>Content</Form.Label>
                <ReactQuill
                    type='text'
                    placeholder='Describe your product here...'
                    value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['link'],
                            ['blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['clean'],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'align': [] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }]
                        ]
                    }}
                />
                {contentError && (
                    <small className='d-block form-text text-danger mt-2'>
                        This field is required! Minimum 5 signs, max 500 signs.
                    </small>
                )}
            </Form.Group>

            <Form.Group controlId='formPrice' className={styles.formGroup}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Set price here...'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </Form.Group>

            <Col xs='12' md='6' className='order-1 order-md-2' >
                <Form.Group controlId='formPhoto' className={styles.formGroup}>
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type='file' onChange={handleFileChange} />
                    <div className={styles.photoContainer}>
                        {previewPhoto && (
                            <>
                                <div className={styles.photoWrapper}>
                                    <img src={previewPhoto} alt='' className={styles.photoImage} />
                                    <div className={styles.removePhotoWrapper}>
                                        <FiX className={styles.removePhoto} onClick={handleRemovePhoto} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {photoError && (
                        <small className='d-block form-text text-danger mt-2'>
                            This field is required! Maximum size is 1mb.
                        </small>
                    )}
                </Form.Group>
            </Col>

            <Button
                variant='success'
                type='submit'
                className={`mt-2 ${styles.submitButton}`}
                disabled={disabledSubmit}
            >
                {actionText}
            </Button>
        </Form>
    );
};

export default AdForm;