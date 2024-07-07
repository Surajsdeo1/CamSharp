import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AdminNavbar() {
    const navigate = useNavigate();
    const [logOutHandle, setLogOutHandle] = useState(false);
    const token = localStorage.getItem('token');


    const logoutButtonHandle = () => {
        setLogOutHandle(true);
        
      }

      const PaymentHistoryButton=()=>{
        navigate('/admin/payment');
      }


      return (
        <>
          {token && (
      <div className='fixed bottom-0 w-full  sm:w-72 md:w-full bg-sky-500 flex justify-between items-center gap-8 p-2 rounded-lg'>
      <i className="fi fi-bs-sign-out-alt text-4xl hover:cursor-pointer text-black  ml-4" onClick={logoutButtonHandle}></i>
      <i className="fi fi-bs-wallet text-4xl hover:cursor-pointer text-black  mr-4" onClick={PaymentHistoryButton}></i>
  </div>
  
          )}

           {/* Logout confirmation modal */}
      {logOutHandle && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-72 max-w-full">
            <p className="mb-4 text-green-700">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600" onClick={() => {
               localStorage.removeItem('token');
                
                navigate('/login');
              }}>
                Yes
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600" onClick={() => setLogOutHandle(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}


        </>
      )
}

export default AdminNavbar;