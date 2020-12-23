var express = require('express');
var router = express.Router();

const imageDB = require('../modules/db').Image;


router.get('/images', function(req, res, next) {
  const param = req.body;
  imageDB.find({}, function(err, images) {
    if(err) {
      throw new Error(err);
    }

    res.send('');
  });

});

router.post('/images', function(req, res, next) {
  const param = req.body;
  imageDB.create({}, function(err, image) {
    if(err) {
      throw new Error(err);
    }
    res.send({});
  })
});

router.delete('/images', function(req, res, next) {
  const param = req.body;
  imageDB.create({}, function(err, image) {
    if(err) {
      throw new Error(err);
    }
    res.send({msg: ""});
  })
});

module.exports = router;
