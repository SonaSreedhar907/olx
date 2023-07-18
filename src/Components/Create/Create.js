import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {useNavigate} from 'react-router-dom';
import { FirebaseContext, AuthContext} from '../../Store/Context';

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const date = new Date();
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if(name && category && price && image) {

      firebase.storage().ref(`/image/${image.name}`)
      .put(image).then(({ref}) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          })
          navigate('/')
        })
      })
    }else{
      setError("ALL FIELDS ARE REQUIRED")
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number"
            value={price} 
            id="fname" 
            onChange={(e) => setPrice(e.target.value)}
            name="Price" />
            <br />
          
          <br />
          <img 
          alt="Posts" 
          width="200px" 
          height="200px" 
          src={image ? URL.createObjectURL(image) : ''}>
          </img>
          
            <br />
            <input onChange={(e) => setImage(e.target.files[0])}
             type="file" />
            <br />
            <div className='error'>{error}</div>
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
      
        </div>
      </card>
    </Fragment>
  );
};

export default Create;