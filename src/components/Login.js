import bcrypt from 'bcryptjs';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

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


        console.log(response.status);
        console.log(response.data);
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

        console.log(response.status);
        console.log(response.data);
        alert(response.data.message);
      }
    } catch (error) {
    //   console.error(error);
      alert(error);
    //   window.location.replace("/User");
    }
  };

  return (
    <div>
        {/* <header className="center-max-size header">
          <span className={"brand"}>Hello Movie</span>
          <span className={"brand"}>Login</span>
        </header>
            <form>
                <div className="mb-3">

                  <label htmlFor="userName" className="form-label">Username</label>
                  <input type="text" 
                      className="form-control" 
                      id="userName" 
                      value={userName}
                      onChange={(event) => {
                          setUserName(event.target.value);
                      }}/>
                </div>
                <div>

                  <label htmlFor="userPassword" className="form-label">Password</label>
                  <input type="password" 
                      className="form-control" 
                      id="userPassword" 
                      value={userPassword}
                      onChange={(event) => {
                          setUserPassword(event.target.value);
                      }}/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={(event) => {event.preventDefault();
                  login();}}>Login</button>
            </div>
        </form> */}
        <header className="d-flex justify-content-between align-items-center">
          
          {/* <span className="btn btn-primary">Login</span> */}
        </header>
        <form className="container mt-5">
          <div className="form-group">
          <div className="form-group">
            <span className="h2">Login</span>
          </div>
            <label htmlFor="userName">Username</label>
            <input type="text" 
              className="form-control" 
              id="userName" 
              value={userName}
              onChange={(event) => {
              setUserName(event.target.value);
            }}/>
          </div>
          <div className="form-group">
          <label htmlFor="userPassword">Password</label>
          <input type="password" 
            className="form-control" 
            id="userPassword" 
            value={userPassword}
            onChange={(event) => {
            setUserPassword(event.target.value);
          }}/>
          </div>
          <div>
            <button className="btn btn-primary" onClick={(event) => {
              event.preventDefault();
              login();
            }}>Login</button>
          </div>
        </form>
    </div>
  );
}

export default Login;


