import bcrypt from 'bcryptjs';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

function User() {

const [userId, setUserId] = useState("");
const [userName, setUserName] = useState("");
const [userPassword, setUserPassword] = useState("");
const [userType, setUserType] = useState("");
const [users, setUsers] = useState([]);

const navigate = useNavigate();

let {username} = useParams();

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    
    const result = await axios.get("https://localhost:7125/api/User/GetUser");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {
  
    event.preventDefault();
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

    Load();
    } catch (err) {
      alert(err);
    }
  }
 
  async function editUser(users) {
    setUserName(users.userName);
    setUserPassword(users.userPassword);
    setUserType(users.userType);
  
    setUserId(users.userId);
  }
 
  async function DeleteUser(userId) {
    await axios.delete("https://localhost:7125/api/User/DeleteUser/" + userId);
    alert("User deleted Successfully");
    setUserId("");
    setUserName("");
    setUserPassword("");
    setUserType("");

    Load();
  }
 
  async function update(event) {
    event.preventDefault();
    try {
 
        await axios.patch("https://localhost:7125/api/User/UpdateUser/"+ users.find((u) => u.userId === userId).userId || userId,
        {
          userId: userId,
          userName: userName,
          userPassword: userPassword,
          userType: userType
 
        }
        );
        alert("Registation Updated");
        setUserId("");
        setUserName("");
        setUserPassword("");
        setUserType("");
    
          Load();
      } catch (err) {
        alert(err);
      }
    }

  function Logout(){
    navigate("/");
  }

return (
    <div className="home-movie">
      <header className="center-max-size header">
        <span className={"brand"}>Hello Movie</span>
        <span className={"brand"}>Admin: {username}</span>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => Logout()}
          >Log out</button>
        </header>
        
        <div class="container d-flex justify-content-center">
            <form>
              {/* <div class="form-group">
                <span className="h2">Administrator</span>
              </div> */}
                {/* <div class="form-group"> */}
                    <input type="text" 
                        class="form-control" 
                        id="userId" 
                        hidden
                        value={userId}
                        onChange={(event) => {
                            setUserId(event.target.value);
                        }}/>
                    <label><h2>User Details</h2></label>
                    <br/>
                    <label>Username</label>
                    <input type="text" 
                        class="form-control" 
                        id="userName" 
                        value={userName}
                        onChange={(event) => {
                            setUserName(event.target.value);
                        }}/>

                    <label>Password</label>
                    <input type="password" 
                        class="form-control" 
                        id="userPassword" 
                        value={userPassword}
                        onChange={(event) => {
                            setUserPassword(event.target.value);
                        }}/>

                    <label>User Type</label>
                    <select 
                        class="form-control"
                        id="userType"
                        value={userType}
                        onChange={(event) => {
                            setUserType(event.target.value);
                        }}>
                        <option value="" disabled selected>Select your option</option>
                        <option value="Normal User">Normal User</option>
                        <option value="Administrator">Administrator</option>
                    </select>       
                {/* </div> */}
                {/* <div> */}
                    <button class="btn btn-primary mt-4" onClick={save}>Register</button>
                    <br/>
                    <button class="btn btn-warning mt-4" onClick={update}>Update</button>
                {/* </div> */}
            </form>
          </div>

        <br></br>
        
        <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th colspan="5"><h2>User Table</h2></th>
          </tr>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">User Type</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {users.map(function fn(user) {
          return (
            <tbody>
              <tr>
                <td>{user.userId} </td>
                <td>{user.userName}</td>
                <td>{Array.from({length: user.userPassword.length}, () => '*').join('')}</td>
                <td>{user.userType}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteUser(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>


    </div>
  );
}

export default User;
