import { useSelector } from 'react-redux';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import { getUser } from '../../../redux/usersRedux';
import styles from '../Header/Header.module.scss';

const Header = () => {
    const user = useSelector((state) => getUser(state));
    const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);

    const handleBurgerClick = () => {
        // Invert Burger Menu State
        setBurgerMenuVisible(!burgerMenuVisible);
    };

    const closeMenu = () => {
        // Hide burger menu
        setBurgerMenuVisible(false);
    };

    return (
        <div>
            <Navbar bg="success" expand="sm" variant="dark" className={`mt-4 mb-4 rounded ${styles['navbar-container']}`}>
                <Container style={{ textShadow: '0 0 5px black, 0 0 10px gray, 0 0 15px black' }}>
                    <Navbar.Brand as={NavLink} to="/" className={styles['navbar-brand']}><strong> NoticeBoard.App </strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleBurgerClick} />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ display: burgerMenuVisible ? 'block' : 'none' }}>
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/" className={styles['nav-link']} onClick={closeMenu}><strong> Home </strong></Nav.Link>
                            {user !== null && (
                                <Nav.Link as={NavLink} to="/logout" className={styles['nav-link']} onClick={closeMenu}><strong> Logout </strong></Nav.Link>
                            )}
                            {user == null && (
                                <Nav.Link as={NavLink} to="/register" className={styles['nav-link']} onClick={closeMenu}><strong> Register </strong></Nav.Link>
                            )}
                            {user == null && (
                                <Nav.Link as={NavLink} to="/login" className={styles['nav-link']} onClick={closeMenu}><strong> Login </strong></Nav.Link>
                            )}
                            <Nav.Link as={NavLink} to="/contact" className={styles['nav-link']} onClick={closeMenu}><strong> Contact </strong></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
