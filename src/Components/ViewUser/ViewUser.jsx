import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../Store/Context";
import { EditUserContext } from "../../Store/EditUserContext";
import { useNavigate } from "react-router-dom";
import "./ViewUser.css";

function ViewUser() {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const { setUserDetails } = useContext(EditUserContext);
  const navigate = useNavigate();
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        const allUsers = snapshot.docs.map((users) => {
          return {
            ...users.data(),
            id: users.id,
          };
        });
        console.log(allUsers);
        setUsers(allUsers);
        setSearchUsers(allUsers);
      });
  }, []);

  const searchHandler = (e) => {
    const { value } = e.target;
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setSearchUsers(filteredUsers);
  };
  
  const handleEditUser = (users) =>{
    console.log(users,'om namashi vaya')
    setUserDetails(users)
    navigate('/admin/edituser');
  }
  return (
    <div>
      <h2 className="userMgmt" style={{ float: "left" }}>
        User Management
      </h2>
      <input
        type="search"
        name=""
        placeholder="Search for user"
        id=""
        style={{ float: "right", width: 400, height: 40, margin: 20 }}
        onChange={searchHandler}
      />
      <table>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Mobile</th>
            <th scope="col">Email</th>
            <th scope="col">Function</th>

          </tr>
        </thead>
        <tbody>
          {searchUsers.map((users) => (
            <tr key={users.id}>
              <td data-label="Account">{users.username}</td>
              <td data-label="Mobile">{users.phone}</td>
              <td data-label="Mobile">{users.email}</td>
              <td data-label="Function">
                <span style={{ cursor: "pointer" }}
                onClick={() => handleEditUser(users)}
                >Edit/Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUser;
