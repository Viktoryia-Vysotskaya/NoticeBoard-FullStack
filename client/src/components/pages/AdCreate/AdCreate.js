import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { getUser } from '../../../redux/usersRedux';
import CreateAdForm from '../../features/CreateAdForm/CreateAdForm';
import styles from './AdCreate.module.scss';

const AdCreate = () => {
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
                <h1 className={styles.createAdTitle}>Create Advert</h1>
                <CreateAdForm />
            </div>
        );
    }
};

export default AdCreate;
