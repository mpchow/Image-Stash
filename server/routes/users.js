var express = require('express');
var router = express.Router();

const userDB = require('../modules/userDB').User;
const imageDB = require('../modules/userDB').Image;

router.get('/', function(req, res, next) {
  try {
    const user = userDB.findOne({});
    res.send(user);

  }
  catch {

  }
});

router.post('/', function(req, res, next) {
  try {
    //TODO: Check if not in there
    const user = userDB.create({});
    res.send({msg: 'Success'});
  }
  catch {

  }
});

router.delete('/', function(req, res, next) {
    userDB.remove({})

  res.send('DFSF');
});

router.get('/images', function(req, res, next) {


  res.send('');
});

router.post('/images', function(req, res, next) {
  res.send('');
});

router.delete('/images', function(req, res, next) {
  res.send('');
});

module.exports = router;
