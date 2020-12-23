// const url = 'mongodb+srv://expenseTracker:bgSlTwr5nCwMYJqw@cluster0-9tbyy.mongodb.net/test?retryWrites=true&w=majority';
const url = 'mongodb+srv://imageStashUser:qk4qtQotPj1VIZT3@cluster0.9tbyy.mongodb.net/Image-Stash?retryWrites=true&w=majority';

const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  id: String,
  email: String,
  images: [],
});

const imageSchema = new Schema({
   path: String,
   userId: String,
});

const User = mongoose.model('users', userSchema);
const Image = mongoose.model('images', imageSchema);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('MongoDB Connected…')})
.catch(err => console.log(err));


module.exports = {User, Image};