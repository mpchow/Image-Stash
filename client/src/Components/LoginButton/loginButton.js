import React from 'react'; 
import { GoogleLogin } from 'react-google-login';
import key from '../../googleAuthKey';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
   const history = useHistory();

   const onSuccess = (res) => {
      console.log('[Login Success] currentUser:', res.profileObj);
      history.push('/dashboard');
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
