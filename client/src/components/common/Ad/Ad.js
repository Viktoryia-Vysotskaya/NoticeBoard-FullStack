import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { Alert, Progress } from 'reactstrap';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import clsx from 'clsx';

import { getAdById, getRequest, removeAdRequest, loadAdsRequest } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/usersRedux';
import { IMGS_URL } from '../../../configs/config';
import styles from './Ad.module.scss';

const Ad = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const ad = useSelector((state) => getAdById(state, id));
    const user = useSelector((state) => getUser(state));
    const request = useSelector(getRequest);

    const [show, setShow] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        if (ad?.sellerInfo.login === user?.login) {
            setShowButtons(true);
        }
    }, [ad, user]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClickRemove = () => {
        handleClose();
        dispatch(removeAdRequest(ad._id));
        setTimeout(() => {
            return navigate('/');
        }, 1000);
    };

    useEffect(() => {
        dispatch(loadAdsRequest());
    }, [dispatch]);

    // If user is logged in and this is his post: Edit - redirects to editing, Delete - redirects to the main page.
    if (request.pending) return <Progress animated color='primary' value={50} />;
    if (request.error) return <Alert color='warning'>{request.error}</Alert>;
    if (!request.success)
        return <Alert color='info'>Something went wrong...</Alert>;
    if (!ad) return <Navigate to='/' />;
    if (request.success)
        return (
            <Container>
                <Row>
                    <Col>
                        <article>
                            <h2 className={styles.title}>{ad.title}</h2>
                            <Row>
                                <Col lg={6} className='align-self-center'>
                                    <div className={styles.section_left}>
                                        <img
                                            src={`${IMGS_URL}/${ad.photo}`}
                                            alt='Product'
                                            className={styles.img}
                                        />
                                    </div>
                                </Col>
                                <Col lg={6} className='align-self-center'>
                                    <div className={styles.section_right}>
                                        <p className={styles.localization}>
                                            Localization: <span>{ad.localization}</span>
                                        </p>
                                        <p>
                                            Price: <span>{ad.price}$ </span>
                                        </p>
                                        <p className={styles.content} dangerouslySetInnerHTML={{ __html: ad.content }} />
                                        <p>
                                            Publication Date: <span>{ad.publicationDate}</span>
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} lg={6}>
                                    <section className={styles.user}>
                                        <Col md={3}>
                                            <div className={styles.avatar_frame}>
                                                <img
                                                    src={`${IMGS_URL}/${ad.sellerInfo.avatar}`}
                                                    alt='Product'
                                                    className={styles.avatar}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={3} className={clsx('align-self-center', 'ml-1', styles.singleLine)}>
                                            <p className='mb-0'>
                                                <span className={styles.label}>User:</span> <span className={styles.info}>{ad.sellerInfo.login}</span>
                                            </p>
                                            <p className='mb-0'>
                                                <span className={styles.label}>Phone number:</span> <span className={styles.info}>{ad.sellerInfo.phoneNumber}</span>
                                            </p>
                                        </Col>
                                    </section>
                                </Col>

                                {showButtons && (
                                    <Col
                                        md={6}
                                        className={clsx(
                                            'd-flex',
                                            'justify-content-center',
                                            'align-items-center'
                                        )}
                                    >
                                        <Row>
                                            <Col>
                                                <Link to={`/ads/edit/${ad._id}`} className='mx-3'>
                                                    <Button variant='secondary'>Edit</Button>
                                                </Link>
                                                <Button variant='danger' onClick={handleShow}>
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Modal show={show} onHide={handleClose} className={styles['custom-modal']}>
                                            <Modal.Header closeButton>
                                                <Modal.Title className={styles['modal-title']}> Are you sure you want to do that? </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className={styles['modal-body']}>
                                                Are you absolutely certain you want to proceed with this action? <br />
                                                Once completed, this post will be permanently erased from the app!
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button id="cancel-button" variant='secondary' onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button id="remove-button" variant='danger' onClick={handleClickRemove}>
                                                    Remove
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Col>
                                )}
                            </Row>
                        </article>
                    </Col>
                </Row>
            </Container>
        );
};

export default Ad;