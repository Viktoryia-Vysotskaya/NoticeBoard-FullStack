import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import styles from './NotFound.module.scss';

const NotFound = () => {
    return (
        <section>
            <h2 className={styles['not-found-heading']}><strong> URL Not Found </strong></h2>
            <div>
                <span className={styles['error-icon']}>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                </span>
                <p className={styles['error-message']}>
                    The requested page could not be located... <br />
                    Please, make sure you have entered the correct URL...
                </p>
            </div>
        </section>
    );
};

export default NotFound;