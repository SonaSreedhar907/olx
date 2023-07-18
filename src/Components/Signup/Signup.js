import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../Store/Context';
import {Link, useNavigate} from 'react-router-dom';
import './Signup.css';
import {getAuth,createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

export default function Signup() {
  const navigate = useNavigate()
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username && email && phone && password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
      let user = userCredential.user;
      updateProfile(auth.currentUser,{displayName: username})
      .then(() => {
        firebase.firestore().collection('users').add({
          id:user.uid,
          username:username,
          email:email,
          phone:phone
        }).then(() => {
          navigate("/login")
        })
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
    }else{
      setError("ALL FIELDS ARE REQUIRED")
    }
    }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <div className='error'>{error}</div>
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
        {/* <a>Login</a> */}
      </div>
    </div>
  );
}