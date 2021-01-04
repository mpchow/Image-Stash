import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './dashboard.css';

const imgToBase64 = (image) => new Promise((resolve, reject) => {
   const reader = new FileReader();
   reader.readAsDataURL(image);
   reader.onload = () => resolve(reader.result);
   reader.onerror = error => reject(error);
});


const Dashboard = () => {
   const location = useLocation();
   const email = location.state.email;
   const [images, setImages] = useState([]);

   const getImages = () => {
      fetch(`http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3001/images?user=${email}`, {
         method: 'GET',
      })
      .then(res => res.json())
      .then(msg => {
         console.log(msg);
         let prevState = images;
         msg.images.concat(prevState);
         console.log(msg.images)
         setImages(msg.images);
      });
   }

   const uploadImages = (images) => {
      fetch('http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3001/images', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            images: images,
            email: email
         })
      })
      .then(res => {
         console.log(res.json());
         setTimeout(getImages, 50);
      });
   }

   const deleteImage = (e) => {
      fetch('http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3001/images', {
         method: 'DELETE',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            email: email,
            name: e.target.id
         })
      })
      .then(res => {
         console.log(res.json());
         setTimeout(getImages, 50);
      })
   }

   const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      let base64Images = [];

      for (let image of formData.values()) {
         console.log(image);
         const base64Img = await imgToBase64(image);
         base64Images.push({base64: base64Img, name: image.name, email: email, type: image.type});
      }
      
      uploadImages(base64Images);
      event.target.reset();
      setImages(getImages());
   }


   useEffect(getImages, [email])
   return (
      <div className="dashboard">
         <h1>Your Images</h1>
         <form onSubmit={handleSubmit}>
            <input type="file" id="images" name="images" multiple></input>
            <input type="submit"></input>
         </form>
         <p>You can upload a collection of photos up to 50mb at a time</p>

         <div className="dashboard-imgs">
            {images && images.map((image) => <div key={image.name} className="img-box">
               <p>{image.name}</p>
               <img src={image.url} id={image.name} alt={image.name} className="img"/>
               <button id={image.name} onClick={deleteImage}>Delete Image</button>
            </div> )
            }
         </div>
      </div>
   )

   }

export default Dashboard;