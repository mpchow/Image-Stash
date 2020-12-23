var express = require('express');
var router = express.Router();

const userDB = require('../modules/db').User;

router.get('/', function(req, res, next) {
  const param = req.body;

  userDB.findOne({}, function(err, person) {
    if(err) {
      throw new Error(err);
    }
    res.send({user: person, msg: "Success"});
  });
});

router.post('/', function(req, res, next) {
  const param = req.body;

  userDB.create({}, function(err, person) {
    if(err) {
      throw new Error(err);
    }
    res.send({msg: "Success"});
  });


  //TODO: Check if not in there
  const user = userDB.create({});
  res.send({msg: 'Success'});
});

router.delete('/', function(req, res, next) {
    const param = req.body;
    userDB.remove({}, function(err, person) {
      if(err) {
        throw new Error(err);
      }
      res.send({msg: 'Success'});
    });

});


module.exports = router;
