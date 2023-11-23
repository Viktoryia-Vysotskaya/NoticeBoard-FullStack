import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { IMGS_URL } from '../../../configs/config';
import styles from './AdSummary.module.scss';

const AdSummary = ({ _id, title, localization, price, photo }) => {
    return (
        <Card key={_id} border='dark' className={styles.card}>
            <Card.Img
                variant='top'
                src={`${IMGS_URL}/${photo}`}
                alt='Product'
                className={styles.img}
            ></Card.Img>
            <Card.Title className={styles.title}>{title}</Card.Title>
            <Card.Text className={styles.localization}> {localization}</Card.Text>
            <Card.Text className={styles.price}> {price} $</Card.Text>
            <Link to={'/ads/' + _id}>
                <Button variant="success" className='mb-2'>View details</Button>
            </Link>
        </Card>
    );
};

export default AdSummary;