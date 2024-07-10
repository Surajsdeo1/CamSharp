import React, { useState, useEffect } from "react"; 
import { Routes, Route , useLocation } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import AboutPage from "../Pages/AboutPage";
import CareerPage from "../Pages/CareerPage";
import Protected from "../Components/Protected";
import ProfilePage from "../Pages/ProfilePage";
import ProfileInformation from "../ProfilePageAllData/ProfileInformation";
import ManageAddress from "../ProfilePageAllData/ManageAddress";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import ForgetPassword from "../Components/Core/ForgetPassword";
import SellOnPage from "../Pages/SellOnPage";
import BookingDetails from "../ProfilePageAllData/BookingDetails";
import ItemsPage from "../Pages/ItemsPage";
import ItemsDetails from "../Pages/ItemsDetailsPage";
import AdminLogInPage from "../Pages/AdminLogInPage";
import AdminPage from "../AdminPages/Admin";
import UserPaymentDetails from "../AdminPages/UserPaymentDetails";
import AllDetailsOfUser from "../AdminPages/AllDetailsOfUser";
import UserBookingDetails from "../AdminPages/UserBookingDetails";
import Footer from "../Components/Common/Footer";
import AdminProtected from "../Components/Adminprotected";
import MainContainer from "../Components/Core/MainContainer";
import ProductPage from "../Pages/ProductPage";
import Footernavbar from "../Components/Common/Footernavbar";
import Gallery from "../Pages/Gallery";

const Routess = () => {
  const [shouldScrollToTop, setShouldScrollToTop] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShouldScrollToTop(false);
    }
  }, [shouldScrollToTop, location]);

  const handleFooterClick = () => {
    setShouldScrollToTop(true);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainContainer />} />
        <Route path='/gallery' element={<Gallery />} />

        <Route path='/about' element={<AboutPage />} />
        <Route path='/career' element={<CareerPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/profile' element={<Protected Component={ProfilePage} />} />
        <Route path='/information' element={<Protected Component={ProfileInformation} />} />
        <Route path='/user/address' element={<Protected Component={ ManageAddress} />}/>

        <Route path='/login' element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/forgot' element={<ForgetPassword/>} />

       
        <Route path='/sell' element={<SellOnPage />} />
        {/* <Route path='/footerbar' element={<Protected Component={Foot}/>} /> */}
      
        <Route path='/user-booking' element={<Protected Component={BookingDetails} />} />
        <Route path='/items/:type' element={<ItemsPage />} />
        <Route path='/items/:type/:itemId/:name' element={<Protected Component={ItemsDetails} />} />


        <Route path='/admin-login' element={<AdminLogInPage />} /> 
        <Route path='/admin' element={<AdminProtected Component={AdminPage} />} />
        <Route path='/admin/payment' element={<AdminProtected Component={UserPaymentDetails} />} />
        <Route path="/payment/:_id/:productId" element={<AdminProtected Component={AllDetailsOfUser} />} />
        <Route path="/user-booking-details/:_id/:productId" element={<AdminProtected Component={UserBookingDetails} />} />


      </Routes>
      <Footernavbar/>
      <Footer onFooterClick={handleFooterClick} />
    </>
  );
};

export default Routess;
