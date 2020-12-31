var express = require('express');
var router = express.Router();

const imageDB = require('../modules/db').Image;


router.get('/', function(req, res, next) {
  const param = req.body;
  imageDB.find({}, function(err, images) {
    if(err) {
      throw new Error(err);
    }

    res.send('');
  });

});

router.post('/', function(req, res, next) {
  const param = req.body;
  const image = new imageDB(param);

  imageDB.findOne({path: param.path}, function(err, image) {
    if(err) {
      next(err);
    }
    if (image !== null) {
      res.send({msg: "Image already in db"})
    }
  });

  image.save(function(err) {
    if(err) {
      next(err);
    }
  });

  res.send({msg: "Success"});
});

router.delete('/', function(req, res, next) {
  const param = req.body;
  imageDB.create({}, function(err, image) {
    if(err) {
      throw new Error(err);
    }
    res.send({msg: ""});
  })
});

module.exports = router;
