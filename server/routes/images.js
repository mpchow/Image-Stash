var express = require('express');
var router = express.Router();

const imageDB = require('../modules/db').Image;

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

  for (let image in images) {
    imageDB.findOne({userEmail: param.email, name: image.name}, function(err, image) {
      if(err) {
        next(err);
      }
      // if (image !== null) {
      //   res.send({msg: "Image already in db"});
      // }
    });

    // console.log(getImgFile(image.base64, image.name));

    //GET the s3 path here

    const imageObj = new imageDB({name: image.name, userEmail: param.email, path: "Test"});


    imageObj.save(function(err) {
      if(err) {
        next(err);
      }
    });
  }

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
