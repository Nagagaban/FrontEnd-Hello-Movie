// import bcrypt from 'bcryptjs';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';

function SignUp() {

  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("Normal User");

  async function save(event) {
  
    try {
      await axios.post("https://localhost:7125/api/User/AddUser", {
        
      userName: userName,
      userPassword: userPassword,
      userType: userType,
      
    });
    alert("User Registation Successfully");
    setUserId("");
    setUserName("");
    setUserPassword("");
    setUserType("");
    navigate("/");

    } catch (err) {
      alert("Error: User Creation Unsuccessful");
    }
  }

  return (
    <div className="login">
      <div id="login-form-wrap">
        <h2 className="h2">Sign Up</h2>
        <form id="login-form">
          <p>
          <input type="text" placeholder="Username..." id="userName" 
               value={userName}
               onChange={(event) => {
               setUserName(event.target.value);
             }} required/>
          </p>
          <p>
          <input type="password" placeholder="Password..." id="userPassword" 
                   value={userPassword}
                   onChange={(event) => {
                   setUserPassword(event.target.value);
                 }} required/>
          </p>
          <p>
          {/* <input type="hidden" id="userType" 
                   value="Normal User"
                    onChange={(event) => {
                    setUserPassword(event.target.value);
                  }} 
                 /> */}
          </p>
          <p>
          <button type="submit" className="btn btn-primary" onClick={(event) => {
               event.preventDefault();
               save();
             }}>Sign Up</button>
          </p>
        </form>
        <div id="create-account-wrap">
          <p>Already have an account? <a href="/">Login Now!</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;


