import { Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { createAddRequest, getRequest, getStatus } from '../../../redux/adsRedux';
import AdForm from '../../common/AdForm/AdForm';
import styles from './CreateAdForm.module.scss';

const CreateAdForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const request = useSelector(getRequest);
    const status = useSelector(getStatus);

    const handleSubmit = (ad) => {
        dispatch(createAddRequest(ad));
    };

    useEffect(() => {
        if (status === 201) {
            const timeoutId = setTimeout(() => {
                navigate('/');
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [status, navigate]);

    if (request.pending) {
        return <Spinner animation='border' />;
    }

    return (
        <div>
            {status === 201 && (
                <Alert variant='success' className={styles.alert}>Your Advert was successfully created!</Alert>
            )}
            <AdForm action={handleSubmit} actionText='Create Advert' />
        </div>
    );
};

export default CreateAdForm;
