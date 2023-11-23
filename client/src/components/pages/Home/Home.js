import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Ads from '../../features/Ads/Ads';
import styles from './Home.module.scss';

const Home = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className={`${styles.title} m-3 d-flex justify-content-center`}>All Adverts</h1>
                </Col>
                <Col className={`${styles.buttonContainer} align-self-center m-4 d-flex justify-content-end`}>
                    <Link to={'/ads/create'}>
                        <Button variant='success' className={styles.button}> Create New Advert </Button>
                    </Link>
                </Col>
            </Row>
            <Ads />
        </Container>
    );
};

export default Home;