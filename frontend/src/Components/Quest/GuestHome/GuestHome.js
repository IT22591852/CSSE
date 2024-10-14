import React from 'react';
import GustNav from '../QuestNAv/QuestNav';
import Bgimg from '../Images/bgimg.jpg';
import Bgimg3 from '../Images/bgimg3.jpg';
import Footer from '../../Footer/Footer';
import './GuestHome.css';

function GuestHome() {
  return (
    <div>
      <div>
        <GustNav/>
        </div>
    <div>
          <p className='weltxt'>Welcome To Eco-R <br/> Waste Management</p>
    <div className='btn-group'>
        <button
          className="nav_btn_log"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>
        <button
          className="nav_btn_regi"
          onClick={() => (window.location.href = "/userregister")}
        >
          Register
        </button>
        </div>
        <div>
        <div className='bgimgcontainer'>
        <img src={Bgimg} alt="logo_nav" className="bgimg" /> 
      </div>
       <div className='des'>
        <p className='des1'>Welcome to ECO-R Waste Management! At ECO-R, we strive to provide efficient waste management services. From this guest dashboard, you can easily navigate to your specific user role. Drivers can manage and fulfill waste collection requests with ease. Customers can request services, track collections, and view their history. Admins oversee operations, manage accounts, and ensure smooth service delivery. Join us in our mission for a cleaner, greener environment.</p>
       </div>
       <div className='bgimg3'>
        <img src={Bgimg3} alt="logo_nav" className="bg-imgg3" /> 
      </div>
        </div>
    </div>
    <div>
      <Footer/>
    </div>
    </div>
  );
}

export default GuestHome;
