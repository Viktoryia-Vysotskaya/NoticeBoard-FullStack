import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import { FiEye, FiEyeOff, FiX } from 'react-icons/fi';

import { AUTH_URL } from '../../../configs/config';
import styles from './Register.module.scss';

const Register = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [status, setStatus] = useState(null); // 'success' ||'clientError' ||'serverError' ||'loginError' ||'loading'

    const handleAvatarChange = (e) => {
        const selectedAvatar = e.target.files[0];

        if (selectedAvatar) {
            setAvatar(selectedAvatar);
            setPreviewAvatar(URL.createObjectURL(selectedAvatar));
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
        setPreviewAvatar(null);

        const fileInput = document.getElementById('formAvatar');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('login', login);
        fd.append('password', password);
        fd.append('phone', phone);
        fd.append('avatar', avatar);

        const options = {
            method: 'post',
            body: fd,
        };

        setStatus('loading');
        fetch(`${AUTH_URL}/register`, options).then((res) => {
            if (res.status === 201) {
                setStatus('success');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if (res.status === 400) {
                setStatus('clientError');
            } else if (res.status === 409) {
                setStatus('loginError');
            } else {
                setStatus('serveError');
            }
        });
    };

    return (
        <Form className='col-12 col-sm-8 mx-auto' onSubmit={handleSubmit}>
            {status === 'success' && (
                <Alert variant='success' className={styles.alert}>
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been succesfully registered! You can now Log In...</p>
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
                    <Alert.Heading>No enough data!</Alert.Heading>
                    <p>You have to fill all the fields!</p>
                </Alert>
            )}

            {status === 'loginError' && (
                <Alert variant='warning' className={styles.alert}>
                    <Alert.Heading>Login is already in use!</Alert.Heading>
                    <p>You have to use other login!</p>
                </Alert>
            )}

            {status === 'loading' && (
                <Spinner animation='border' role='status' className='block mx-auto'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            )}

            <h1 className={`m4 ${styles.title}`}>Register</h1>

            <Form.Group className='mb-3' controlId='formLogin'>
                <Form.Label className={styles.formLabel}>Login</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter login...'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
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
                        {showPassword ? <FiEyeOff style={{ color: 'green' }} /> : <FiEye style={{ color: 'green' }} />}                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPhone'>
                <Form.Label className={styles.formLabel}>Phone number</Form.Label>
                <Form.Control
                    type='tel'
                    placeholder='Enter phone number...'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formAvatar'>
                <Form.Label className={styles.formLabel}>Avatar</Form.Label>
                <Form.Control type='file' onChange={handleAvatarChange} />
                <div className={styles.avatarContainer}>
                    {previewAvatar && (
                        <div className={styles.avatarWrapper}>
                            <img src={previewAvatar} alt='Avatar Preview' className={styles.avatarImage} />
                            <div className={styles.removeAvatarWrapper}>
                                <FiX className={styles.removeAvatar} onClick={handleRemoveAvatar} />
                            </div>
                        </div>
                    )}
                </div>
            </Form.Group>

            <Button variant='success' type='submit' className={styles.buttonSubmit}>
                Submit
            </Button>
        </Form>
    );
};

export default Register;