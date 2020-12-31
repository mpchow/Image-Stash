const url = require('./mongoAPI');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
});

const imageSchema = new Schema({
   name: String,
   userEmail: String,
   path: String
});

const User = mongoose.model('users', userSchema);
const Image = mongoose.model('images', imageSchema);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('MongoDB Connected…')})
.catch(err => console.log(err));


module.exports = {User, Image};