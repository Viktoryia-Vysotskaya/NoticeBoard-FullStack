import { Alert, Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import clsx from 'clsx';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { getAds, getRequest, loadAdsRequest } from '../../../redux/adsRedux';
import AdSummary from '../../common/AdSummary/AdSummary';
import styles from './Ads.module.scss';

const Ads = () => {
    const dispatch = useDispatch();
    const ads = useSelector(getAds);
    const request = useSelector(getRequest);
    const navigate = useNavigate();

    const [searchPhrase, setSearchPhrase] = useState('');

    useEffect(() => {
        dispatch(loadAdsRequest());
    }, [dispatch]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/ads/search/${searchPhrase}`);
    };

    if (request.pending) return <Spinner />;
    if (request.error) return <Alert color='warning' className={styles.alert}>{request.error}</Alert>;
    if (!request.success || !ads?.length)
        return <Alert color='success' className={styles.alert}>No Adverts</Alert>;
    if (request.success)
        return (
            <Container>
                <Form onSubmit={handleSearchSubmit}>
                    <Row
                        className={clsx(
                            'd-flex, align-content-center, justify-content-end my-3'
                        )}
                    >
                        <Col xs='2' md='8' className={styles.icon_col}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Col>
                        <Col xs='6' md='3' className={styles.inputSearch}>
                            <Form.Control
                                type='text'
                                value={searchPhrase}
                                placeholder='Type to search...'
                                onChange={(e) => setSearchPhrase(e.target.value)}
                                id='searchInput'
                            ></Form.Control>
                        </Col>
                        <Col xs='4' md='1' className={styles.buttonSearch}>
                            <Button type='submit' variant="success">Search</Button>
                        </Col>
                    </Row>
                </Form>
                <section className={clsx('justify-content-between')}>
                    <Row>
                        {ads.map((ad) => (
                            <Col
                                key={ad._id}
                                xs={12}
                                sm={6}
                                lg={3}
                                className='justify-content-center mb-2'
                            >
                                <AdSummary key={ad._id} {...ad} />
                            </Col>
                        ))}
                    </Row>
                </section>
            </Container>
        );
};

export default Ads;