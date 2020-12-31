import React from 'react';
import './login.css';
import LoginButton from '../LoginButton/loginButton';

class Login extends React.Component {
   render() {
      return (
         <div className="login-screen">
            <h1>Image Stash</h1>
            <LoginButton />
         </div>
      )
   }
}

export default Login;