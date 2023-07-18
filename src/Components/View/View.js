import React, {useEffect, useState, useContext} from 'react';
import './View.css';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

function View() {
  const [userDetails, setUserDetalis] = useState()
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)
  const db = getFirestore();

  useEffect(() => {
    console.log(postDetails);
    const {userId} = postDetails;
    const q = query(collection(db, "users"), where("id", "==", userId));

    const querySnapshot =  getDocs(q);
    querySnapshot.then((snapshot) => {

      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUserDetalis(doc.data())
        console.log(doc.id, " => ", doc.data());
      });
    })
    
    // firebase.firestore().collection('users')
    // .where('id','==','userId').get().then((res) => {
    //   res.forEach(doc => {
    //     setUserDetalis(doc.data())
    //   });
    // })

     // eslint-disable-next-line
  },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails && postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails && postDetails?.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>Tue May 04 2023</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;