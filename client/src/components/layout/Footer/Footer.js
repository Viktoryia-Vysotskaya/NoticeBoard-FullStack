import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={styles['footer-container']}>
            <span>Coded by Viktoryia Vysotskaya</span>
            <span>Copyright &copy; NoticeBoard.App 2023</span>
        </div>
    );
};

export default Footer;
