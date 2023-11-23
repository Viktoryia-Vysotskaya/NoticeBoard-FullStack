import { Container } from 'react-bootstrap';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <Container>{children}</Container>
            <Footer />
        </div>
    );
};

export default MainLayout;