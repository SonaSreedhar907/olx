import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Store/Context";
import { FirebaseContext } from "../../Store/Context";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const auth = firebase.auth();
  const user = useContext(AuthContext);
  const [userData, setUserData] = useState("");

     console.log(user?.user?.uid)

  useEffect(() => {
    // console.log(user.user.uid)
    setEmail(user?.user?.email);
    setName(user?.user?.displayName);
    if(name)
    {firebase
      .firestore()
      .collection("users")
      .where("username", "==", name)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          setUserData(doc.data());
        });
      })
      .catch((err) => {
        console.log(err);
      });}
    // const userId = userDetails.id
  });

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .storage()
      .ref(`/Profile-Image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then(async (url) => {
          console.log("File available at", url);
          if (email) {
            firebase
              .firestore()
              .collection("users")
              .where("email", "==", email)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref
                    .update({ profileUrl: url })
                    .then(() => {
                      console.log("Document updated");
                      navigate("/");
                    })
                    .catch((error) => {
                      console.error("Error updating document:", error);
                    });
                });
              })
              .catch((error) => {
                console.error("Error getting documents:", error);
              });
          }
        });
      });
  };
// console.log(userData);
  return (
    <div>
      <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

      <div className="wrapper">
        <div className="left">
          <img
            width="250px"
            src={image ? URL.createObjectURL(image) : userData.profileUrl}
            alt=""
          />
          <h4>{name}</h4>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button className="uploadBtn" onClick={(e) => handleSubmit(e)}>
            upload and Submit
          </button>
        </div>
        <div className="right">
          <div className="info">
            <h3>Information</h3>
            <div className="info_data">
              <div className="data">
                <h4>User Name</h4>
                <p>{name}</p>
              </div>
              <div className="data">
                <h4>Email</h4>
                <p>{email}</p>
              </div>
            </div>
          </div>

          <div className="info">
            {/* <button onClick={handleSave} className="button">
              Save
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;