import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function UserLogin() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user);

        if(user.email === '' || user.password === '') {
          alert('Please enter email and password');
          return;
        }
      };
      const handleInputChange = (event) => {
        setUser({ 
        ...user, 
        [event.target.name]: event.target.value });
    };


  return (
   <div>
      <div className="auth_box">
        <div>
          <h1 className="login-topic">User Login Here..!</h1>
          <br></br>
          <div className="user_tabl_towcolum">
            <div className="left_colum_user">
              <img src={logimg} alt="regi img" className="regi_img" />
            </div>
            <div className="riight_colum_user">
              <form className="regi-form" onSubmit={handleSubmit}>
                <label className="login-lable">Email </label>
                <br></br>
                <input
                  type="username"
                  className="login-input"
                  value={user.username}
                  onChange={handleInputChange}
                  name="username"
                  required
                ></input>
                
                <br></br>
                <label className="login-lable">Password</label>
                <br></br>
                <input
                  type="password"
                  className="login-input"
                  value={user.password}
                  name="password"
                  onChange={handleInputChange}
                  required
                ></input>
                <br></br>
                <button className="admin_form_cneter_btn" type="submit">
                  Login
                </button>
                <br></br>
               <label className="login-lable">Don't have an account? <a href="/userregister">Register</a></label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
