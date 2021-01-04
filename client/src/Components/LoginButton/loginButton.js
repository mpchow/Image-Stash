import React from 'react'; 
import { GoogleLogin } from 'react-google-login';
import key from '../../googleAuthKey';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
   const history = useHistory();

   const createUser = (email) => {
      fetch('http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3001/users', {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({
            email: email
         })
      })
   }

   const onSuccess = (res) => {
      console.log('[Login Success] currentUser:', res.profileObj);
      createUser(res.profileObj.email);
      history.push({
            pathname: '/dashboard',
            state: { email: res.profileObj.email}
          });
   }

   const onFailure = (res) => {
      console.log('[Login failed] res:', res);
   }

      return (
         <div>
            <GoogleLogin
               clientId={key}
               buttonText="Login"
               onSuccess={onSuccess}
               onFailure={onFailure}
               cookiePolicy={'single_host_origin'}
               style={{ marginTop: '100px' }}
               isSignedIn={true}
            />
         </div>
      )
}

export default LoginButton;
