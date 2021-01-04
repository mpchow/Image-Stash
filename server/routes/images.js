var express = require('express');
var router = express.Router();

const imageDB = require('../modules/db').Image;
const uploadToS3 = require('../modules/s3').uploadToS3;
const deleteFromS3 = require('../modules/s3').deleteFromS3;


router.get('/', function(req, res, next) {
  const param = req.query;
  imageDB.find({userEmail: param.user}, function(err, images) {
    if(err) {
      throw new Error(err);
    }

    res.send({msg: "Success", images: images});
  });

});

router.post('/', function(req, res, next) {
  const param = req.body;
  const images = param.images;

  images.forEach(async image => {
    try {
      const img = await imageDB.findOne({userEmail: param.email, name: image.name});

      if(img === null) {
        const path = `${param.email}/${image.name}`;
        const type = image.type;
        const base64Data = new Buffer.from(image.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    
        const url = await uploadToS3(base64Data, type, path);
        const imageObj = new imageDB({name: image.name, userEmail: param.email, path: path, url: url});
    
        imageObj.save(function(err) {
          if(err) {
            next(err);
          }
        });
      }
    }
    catch (err) {
      next(err);
    }

  });

  res.send({msg: "Success"});
});

router.delete('/', function(req, res, next) {
  const param = req.body;
  imageDB.deleteOne({userEmail: param.email, name: param.name}, function(err, image) {
    if(err) {
      throw new Error(err);
    }
    deleteFromS3(param.name);

    res.send({msg: "Success"});
  })
});

module.exports = router;
