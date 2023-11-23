import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { logIn } from '../../../redux/usersRedux';
import { AUTH_URL } from '../../../configs/config';
import styles from './Login.module.scss';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
            credentials: 'include',
        };
        setStatus('loading');
        fetch(`${AUTH_URL}/login`, options)
            .then((res) => {
                if (res.status === 200) {
                    setStatus('success');
                    dispatch(logIn({ login }));
                    setTimeout(() => {
                        return navigate('/');
                    }, 2000);
                } else if (res.status === 400) {
                    setStatus('clientError');
                } else {
                    setStatus('serverError');
                }
            })
            .catch((err) => {
                setStatus('serverError');
            });
    };

    return (
        <Form className='col-12 col-sm-8 mx-auto' onSubmit={handleSubmit}>
            {status === 'success' && (
                <Alert variant='success' className={styles.alert}>
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been succesfully logged in!</p>
                </Alert>
            )}

            {status === 'serverError' && (
                <Alert variant='danger' className={styles.alert}>
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... try again!</p>
                </Alert>
            )}

            {status === 'clientError' && (
                <Alert variant='danger' className={styles.alert}>
                    <Alert.Heading>Incorrect data</Alert.Heading>
                    <p>Login or password are incorrect...</p>
                </Alert>
            )}

            {status === 'loading' && (
                <Spinner animation='border' role='status' className='block mx-auto'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            )}
            <h1 className={`m4 ${styles.title}`}>Login</h1>

            <Form.Group className='mb-3' controlId='formLogin'>
                <Form.Label className={styles.formLabel}>Login</Form.Label>
                <Form.Control
                    type='text'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder='Enter login...'
                ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
                <Form.Label className={styles.formLabel}>Password</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Enter password...'
                    />
                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FiEyeOff style={{ color: 'green' }} /> : <FiEye style={{ color: 'green' }} />}
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>

            <Button type='submit' variant='success' className={styles.buttonSubmit}>Login</Button>
        </Form >
    );
};

export default Login;