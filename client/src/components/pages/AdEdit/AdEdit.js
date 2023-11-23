import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

import EditAdForm from '../../features/EditAdForm/EditAdForm';
import { getUser } from '../../../redux/usersRedux';
import styles from './AdEdit.module.scss';

const AdEdit = () => {
    const user = useSelector((state) => getUser(state));
    const navigate = useNavigate();
    if (!user)
        return (
            <Alert
                color='warning'
                className={`${styles.alert} mt-2`}
                onClick={() => navigate('/login')}
            >
                You are not authorized. Please, Log In!
            </Alert>
        );
    if (user) {
        return (
            <div>
                <h1 className={styles.editAdTitle}>Edit Advert</h1>
                <EditAdForm />
            </div>
        );
    }
};

export default AdEdit;