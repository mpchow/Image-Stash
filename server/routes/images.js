var express = require('express');
var router = express.Router();

const imageDB = require('../modules/db').Image;
const uploadToS3 = require('../modules/s3');

// const getImgFile = (url, filename) => {
//   let arr = url.split(','),
//       mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]), 
//       n = bstr.length, 
//       u8arr = new Uint8Array(n);
      
//   while(n--){
//       u8arr[n] = bstr.charCodeAt(n);
//   }
  
//   return new File([u8arr], filename, {type:mime});
// }


router.get('/', function(req, res, next) {
  const param = req;
  imageDB.find({userEmail: param.email}, function(err, images) {
    if(err) {
      throw new Error(err);
    }

    res.send({msg: "Success", images: images});
  });

});

router.post('/', function(req, res, next) {
  const param = req.body;
  const images = param.images;

  images.forEach(image => {

    imageDB.findOne({userEmail: param.email, name: image.name}, function(err, image) {
      if(err) {
        next(err);
      }
      if (image === null) {
        const path = `${param.email}/${image.name}`;
        const type = image.type;
        const base64Data = new Buffer.from(image.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    
        const url = uploadToS3(base64Data, type, path);
        const imageObj = new imageDB({name: image.name, userEmail: param.email, path: path});
    
        imageObj.save(function(err) {
          if(err) {
            next(err);
          }
        });
      }
    });


  });

  res.send({msg: "Success"});
});

router.delete('/', function(req, res, next) {
  const param = req.body;
  imageDB.create({userEmail: param.email, name: param.name}, function(err, image) {
    if(err) {
      throw new Error(err);
    }
    res.send({msg: "Success"});
  })
});

module.exports = router;
