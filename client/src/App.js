import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Home from './components/pages/Home/Home';
import Ad from './components/common/Ad/Ad';
import AdCreate from './components/pages/AdCreate/AdCreate';
import AdEdit from './components/pages/AdEdit/AdEdit';
import SearchedAds from './components/pages/SearchedAds/SearchedAds';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ads/:id' element={<Ad />} />
        <Route path='/ads/create' element={<AdCreate />} />
        <Route path='/ads/edit/:id' element={<AdEdit />} />
        <Route path='/ads/search/:searchPhrase' element={<SearchedAds />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;