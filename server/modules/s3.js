const AWS = require('aws-sdk');
const s3Secrets = require('./awsKey');
const id = s3Secrets.id;
const secret = s3Secrets.secret;
const bucket = 'imagestashstorage';

const s3 = new AWS.S3({
   accessKeyId: id,
   secretAccessKey: secret 
});

const uploadToS3 = async (base64, type, path) => {
   try {
      let url;
      const s3params = {
         Bucket: bucket,
         Key: path,
         Body: base64,
         ACL: 'public-read',
         ContentEncoding: 'base64',
         ContentType: type
      };
      await s3.upload(s3params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded to ${data.Location}`);
        url = data.Location;
     });
     return url;
   }
   catch (err) {
      throw new Error(err);
   }
}

module.exports = uploadToS3;




