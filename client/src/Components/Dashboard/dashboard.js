import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const imgToBase64 = (image) => new Promise((resolve, reject) => {
   const reader = new FileReader();
   reader.readAsDataURL(image);
   reader.onload = () => resolve(reader.result);
   reader.onerror = error => reject(error);
});


const Dashboard = () => {
   const location = useLocation();
   const email = location.state.email;


   const createUser = () => {
      fetch('http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3000/users', {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({
            email: email
         })
      })
      .then(res => console.log(res.json()))
   }

   const getImages = () => {
      return fetch(`http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3000/images?user=${email}`, {
         method: 'GET',
      })
      .then(res => res.json())
   }

   const uploadImages = (images) => {
      fetch('http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3000/images', {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({
            images: images,
            email: email
         })
      })
   }

   const deleteImage = () => {
      fetch('http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3000/images', {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         method: 'DELETE',
         body: JSON.stringify({
            email: email
         })
      })
   }

   // createUser();
   const [images, setImages] = useState(getImages());

   const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      let base64Images = [];

      for (let image of formData.values()) {
         console.log(image);
         imgToBase64(image)
         .then(base64Img => {base64Images.push({base64: base64Img, name: image.name, email: email})
         console.log(base64Img);
      })
      }

      // event.target.reset();
      uploadImages(base64Images);
      setImages(getImages());
   }

   return (
      <div>
         <h1>Your Images</h1>
         <form onSubmit={handleSubmit}>
            <input type="file" id="images" name="images" multiple></input>
            <input type="submit"></input>
         </form>

         {/* {images.map((image) => <div>
            <img src={image.url} id={image.name} alt={image.name}/>
             NEED TO FIX THE CLICK 
            <button onClick={deleteImage}></button>
         </div> )
         } */}
      </div>
   )

   }

export default Dashboard;