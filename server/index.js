const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3000;
const DB = 'mongodb://localhost/forola35';

mongoose.connect(DB);

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', UserSchema);

app.post('/users/login', (req, res) => {
  User
    .find({ username: req.body.username })
    .exec((err, user) => {
      if (user.password == req.body.password)
        res.json({ msg: 'Login correcto' });
      else {
        res.json({ msg: 'Credenciales incorrectas' });
      }
    });
});

app.listen(PORT, () => {
  console.log('Server listening on port 3000');
})
