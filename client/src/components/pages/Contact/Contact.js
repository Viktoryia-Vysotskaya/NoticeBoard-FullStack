import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WebIcon from '@mui/icons-material/Web';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import styles from './Contact.module.scss';

const Contact = () => {
    return (
        <div className={styles.container}>
            <p>Feel free to get in touch with me through the following contacts:</p>
            
            <div className={styles.element}>
                <EmailIcon className={styles.icon} />
                <a href="mailto: radevich.vika2014@gmail.com"> radevich.vika2014@gmail.com</a>
            </div>
            <div className={styles.element}>
                <LocalPhoneIcon className={styles.icon} />
                <a href="tel:+48886180848">+48 886 180 848</a>
            </div>
            <div className={styles.element}>
                <WebIcon className={styles.icon} />
                <a href="https://github.com/Viktoryia-Vysotskaya" target="_blank" rel="noreferrer">Github</a>
            </div>
            <div className={styles.element}>
                <LinkedInIcon className={styles.icon} />
                <a href="https://www.linkedin.com/in/viktoryia-vysotskaya/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
        </div>
    )
}

export default Contact;
