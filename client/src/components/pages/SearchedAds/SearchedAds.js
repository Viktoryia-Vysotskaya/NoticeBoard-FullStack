import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {getAds, getRequest, loadSearchedAdsRequest} from '../../../redux/adsRedux';
import AdSummary from '../../common/AdSummary/AdSummary';
import styles from './SearchedAds.module.scss';

const SearchedAds = () => {
    const { searchPhrase } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ads = useSelector(getAds);
    const request = useSelector(getRequest);

    const handleAlertClick = () => {
        navigate('/');
    };

    useEffect(() => {
        dispatch(loadSearchedAdsRequest(searchPhrase));
    }, [dispatch, searchPhrase]);

    if (request.pending)
        return <Spinner animation='border' color='primary' className='mt-3' />;
    if (request.error)
        return (
            <Alert color='warning' className='mt-3'>
                {request.error}
            </Alert>
        );
    if (!request.success)
        return (
            <Alert variant='warning' className={`${styles.alert} ${styles.click} mt-3`} onClick={handleAlertClick}>
                Oops...Try a new search query!
            </Alert>
        );
    if (request.success)
        return (
            <Container>
                <h1 className={styles.title}>Searched Adverts</h1>
                <section>
                    <Row>
                        {ads.map((ad) => (
                            <Col
                                key={ad._id}
                                xs={12}
                                sm={6}
                                lg={3}
                                className='justify-content-center'
                            >
                                <AdSummary key={ad._id} {...ad} />
                            </Col>
                        ))}
                    </Row>
                </section>
            </Container>
        );
};

export default SearchedAds;