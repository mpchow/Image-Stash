import React from 'react'; 
import { GoogleLogin } from 'react-google-login';
import { withRouter } from "react-router-dom";
import key from '../../../googleAuthKey';

class LoginButton extends React.Component {
   onSuccess (res) {
      console.log('[Login Success] currentUser:', res.profileObj);
      this.props.history.push('/dashboard');
   }

   onFailure (res) {
      console.log('[Login failed] res:', res);
   }

   render() {
      return (
         <div>
            <GoogleLogin
               clientId={key}
               buttonText="Login"
               onSuccess={this.onSuccess}
               onFailure={this.onFailure}
               cookiePolicy={'single_host_origin'}
               style={{ marginTop: '100px' }}
               isSignedIn={true}
            />
         </div>
      )
   }
}

// export default LoginButton;
export default withRouter(LoginButton);
