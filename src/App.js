import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import './App.css';
import View from './Pages/ViewPost'
import Post from './Store/PostContext';
import Admin from "./Pages/Admin";
import AdminLogin from './Pages/AdminLogin'
import EditUser from './Pages/EditUser'
import Profile from './Pages/Profile'
import EditUserData from './Store/EditUserContext';
import { FirebaseContext,AuthContext } from './Store/Context';

/**
 * ?  =====Import Components=====
 */

function App() {
  const {user,setUser} = useContext(AuthContext)
  const { firebase } =useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      console.log(user)
      if(user){
        setUser(user)
      }else{
        setUser(null)
      }
    })
  },[])
  return (
    <div>
      <Post>
      <EditUserData>
      <Router>
        <Routes>
          <Route exact path = '/' element={<Home/>}>
          </Route>
          <Route path = '/signup' element={<Signup/>}>
          </Route>
          <Route path = '/login' element={<Login/>}>
          </Route>
          <Route path = '/create' element={<Create/>}>
          </Route>
          <Route path = '/view' element={<View/>}>
          </Route>
         
          <Route path = '/profile' element={<Profile/>}>
          </Route>

          <Route path="/admin" element={<AdminLogin />}>
            </Route>
          <Route path="/admin/home" element={<Admin />}>
            </Route>

            <Route path="/admin/editUser" element={<EditUser />}>
            </Route>
           
        </Routes>
      </Router>
      </EditUserData>
      </Post>
    </div>
  );
}

export default App;