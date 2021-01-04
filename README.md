# Image-Stash
An image repository applcation built with React, Express, MongoDB, AWS EC2 and S3  
You can view it [here](http://ec2-3-96-142-166.ca-central-1.compute.amazonaws.com:3000/)

Image-Stash allows users to easily login with their Google account and manage photos in their stash.

## Running it yourself
1. Set up Google oAuth2.0 and place the key in ```client/src/googleAuthKey.js```  
2. Set up AWS access credentials and place the secrets in ```server/modules/s3.js```
3. Create a bucket you want to use and place the name in the same folder from above
4. Spin up an ec2 instance and replace the url in ```client/src/Components/Dashboard/dashboard.js``` and ```client/src/Components/LoginButton/LoginButton.js```
5. Hit ```npm install && npm start``` in both ```client``` and ```server``` to begin!

Note: You can host the frontend and backend separately as allows
