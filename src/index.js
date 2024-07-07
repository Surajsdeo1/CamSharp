import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import AdminLoginPage from './Pages/AdminLogInPage';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignupPage';
import ForgetPassword from './Components/Core/ForgetPassword';
import AboutPage from './Pages/AboutPage';
import SellOnPage from './Pages/SellOnPage';
import CareerPage from './Pages/CareerPage';
import ProfilePage from './Pages/ProfilePage';
import ProfileInformation from './ProfilePageAllData/ProfileInformation';
import BookingDetails from './ProfilePageAllData/BookingDetails';
import ItemsPage from './Pages/ItemsPage';
import ItemsDetailsPage from './Pages/ItemsDetailsPage';
import AdminPage from './AdminPages/Admin';
import UserPaymentDetails from './AdminPages/UserPaymentDetails';
import UserBookingDetails from './AdminPages/UserBookingDetails';
import Protected from './Components/Protected';
import AdminProtected from './Components/Adminprotected';
import AllDetailsOfUser from './AdminPages/AllDetailsOfUser';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <div className='bg-white text-gray-700 relative'>
      <BrowserRouter>
        {/* Wrap your Routes with Provider and provide the store */}
       
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/admin-login' element={<AdminLoginPage/>} />

            <Route path='/login' element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/forgot' element={<ForgetPassword />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/sell' element={<SellOnPage />} />
            {/* <Route path='/footerbar' element={<Protected Component={Foot}/>} /> */}
            <Route path='/career' element={<CareerPage />} />
            <Route path='/profile' element={<Protected Component={ProfilePage}/>} />
            <Route path='/information' element={<Protected Component={ProfileInformation}/>} />
            <Route path='/user-booking' element={<Protected Component={BookingDetails}/>} />
            <Route path='/items/:type' element={<ItemsPage />} />
            <Route path='/items/:type/:itemId/:name' element={<Protected Component={ItemsDetailsPage}/>} />
            <Route path='/admin' element={<AdminProtected Component={AdminPage}/>} />
            <Route path='/admin/payment' element={<AdminProtected Component={UserPaymentDetails}/>}/>
            <Route path="/payment/:_id/:productId" element={<AdminProtected Component={AllDetailsOfUser}/>} />
            <Route path="/user-booking-details/:_id/:productId" element={<AdminProtected Component={UserBookingDetails}/>} />

          </Routes>
        
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  root
);
