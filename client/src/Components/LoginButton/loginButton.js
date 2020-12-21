import React from 'react'; 
import { GoogleLogin } from 'react-google-login';
import { withRouter } from "react-router-dom";

const clientId = 'Google_Client_Key_Here';

class LoginButton extends React.Component {
   constructor(props) {
      super(props);
   }


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
               clientId={clientId}
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
