// import bcrypt from 'bcryptjs';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {

  const navigate = useNavigate();

  // const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");

  const login = async () => {
    // Create the user object to send in the request
    const user = {
    //   UserId: userId,
      UserName: userName,
      UserPassword: userPassword,
      UserType: userType
    };

    try {
      // Send the POST request to the API endpoint
      const response = await axios.post("https://localhost:7125/api/User/LoginUser", user);
      // check if the response is OK
      if (response.status === 200) {
        // The login was successful

        window.auth = true;

        // console.log(response.status);
        // console.log(response.data);
        alert(response.data.message);

        // window.location.replace("/User");

        // redirect to the next page
        if (response.data.message === "Login successful as Administrator") {
          navigate("/User/" + userName.toString());
        } else if (response.data.message === "Login successful as Normal User") {
          navigate("/Home/" + userName.toString());
        }
      } else {
        // The login was not successful

        window.auth = false;

        // console.log(response.status);
        // console.log(response.data);
        alert(response.data.message);
      }
    } catch (error) {
    //   console.error(error);
      alert(error);
    //   window.location.replace("/User");
    }
  };

  return (
    // <div>
    //     <header className="d-flex justify-content-between align-items-center">
    //     </header>
    //     <form className="container mt-5">
    //       <div className="form-group">
    //       <div className="form-group">
    //         <span className="h2">Login</span>
    //       </div>
    //         <label htmlFor="userName">Username</label>
    //         <input type="text" 
    //           className="form-control" 
    //           id="userName" 
    //           value={userName}
    //           onChange={(event) => {
    //           setUserName(event.target.value);
    //         }}/>
    //       </div>
    //       <div className="form-group">
    //       <label htmlFor="userPassword">Password</label>
    //       <input type="password" 
    //         className="form-control" 
    //         id="userPassword" 
    //         value={userPassword}
    //         onChange={(event) => {
    //         setUserPassword(event.target.value);
    //       }}/>
    //       </div>
    //       <div>
    //         <button className="btn btn-primary" onClick={(event) => {
    //           event.preventDefault();
    //           login();
    //         }}>Login</button>
    //       </div>
    //     </form>
    // </div>
    <div className="login">
      <div id="login-form-wrap">
        <h2 className="h2">Login</h2>
        <form id="login-form">
          <p>
          <input type="text" name="username" placeholder="Username..." id="userName" 
               value={userName}
               onChange={(event) => {
               setUserName(event.target.value);
             }} required/>
          </p>
          <p>
          <input type="password" name="password" placeholder="Password..." id="userPassword" 
                   value={userPassword}
                   onChange={(event) => {
                   setUserPassword(event.target.value);
                 }} required/>
          </p>
          <p>
          {/* <input type="submit" id="login" value="Login"/> */}
          <button type="submit" className="btn btn-primary" onClick={(event) => {
               event.preventDefault();
               login();
             }}>Login</button>
          </p>
        </form>
        <div id="create-account-wrap">
          <p>Not a member? <a href="/Signup">Create Account</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;


