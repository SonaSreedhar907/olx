import React, { useContext, useState, useEffect } from "react";
import { EditUserContext } from "../../Store/EditUserContext";
import { FirebaseContext } from "../../Store/Context";
import { useNavigate } from "react-router-dom";

import "./EditUser.css";

function EditUser() {
  const [userData, setUserData] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { userDetails } = useContext(EditUserContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = userDetails.id;
    firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
      res.forEach((doc) => {
        setUserData(doc.data());
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const deleteUser = (e) => {
    e.preventDefault();
    const id = userDetails.id;
    firebase.firestore().collection('users').doc(id).delete().then(() => {
      navigate('/admin/home');
    }).catch((e) => {
      console.log(e);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const id = userDetails.id;
    firebase.firestore().collection('users').doc(id).update({
      username: name ? name : userDetails.username,
      email: email ? email : userDetails.email,
      phone: phone ? phone : userDetails.phone,
      id: id
    }).then(() => {
      navigate('/admin/home');
    }).catch((error) => {
      console.log('Error updating user data:', error);
    });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <form>
          <label htmlFor="User Name">User Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name ? name : userDetails.username}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email ? email : userDetails.email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            defaultValue="johndoe@gmail.com"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone ? phone : userDetails.phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="Phone"
            defaultValue="1234567890"
          />
          <br />
          <br />
          <button onClick={(e) => submitHandler(e)}>Update</button>
          <button onClick={(e) => deleteUser(e)}>Delete</button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
