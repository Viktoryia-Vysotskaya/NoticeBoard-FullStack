import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logOut } from '../../../redux/usersRedux';
import { AUTH_URL } from '../../../configs/config';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: 'DELETE',
            credentials: 'include',
        };

        fetch(`${AUTH_URL}/logout`, options).then(() => {
            dispatch(logOut());
            setTimeout(() => {
                return navigate('/');
            }, 1000);
        });
    }, [dispatch, navigate]);

    return null;
};
export default Logout;