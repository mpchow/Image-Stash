const AWS = require('aws-sdk');
const id = '<AWSAccessKeyID Here>';
const secret = '<AWSSecretKey Here>';
const bucket = 'imagestashstorage';

const s3 = new AWS.S3({
   accessKeyId: id,
   secretAccessKey: secret 
});

const uploadToS3 = async (base64, type, path) => {
   try {
      const s3params = {
         Bucket: bucket,
         Key: path,
         Body: base64,
         ACL: 'public-read',
         ContentEncoding: 'base64',
         ContentType: type
      };
      const data = await s3.upload(s3params).promise();
      console.log(`File uploaded to ${data.Location}`);
      return data.Location;
   }
   catch (err) {
      throw new Error(err);
   }
}

const deleteFromS3 = async (path) => {
   try {
      const s3params = {
         Bucket: bucket, 
         Key: path
      };
      
      await s3.deleteObject(s3params);
   }
   catch(err) {
      throw new Error(err);
   }

}

module.exports = {uploadToS3, deleteFromS3};




