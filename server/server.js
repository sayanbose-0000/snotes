import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserModel from './models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config(); // dot env is used to get values from environment variables
const privateKey = process.env.PRIVATE_KEY;

const app = express();

const port = process.env.PORT;
const MongoURI = process.env.MONGO_URI;

app.use(express.json()); // middleware
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // for preventing cors error
app.use(cookieParser()); // need this so that the  profile endpoint where we want to access the cookie using req.cookie works

mongoose.connect(MongoURI);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

const saltRounds = 10; // used in bcrypt for hasing the password




// -------------------------END POINTS----------------------------

// --------Signup portion here---------
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, saltRounds, async function (err, hash) { // hashing password
    try {
      const userDoc = await UserModel.create({
        username,
        email,
        password: hash
      });

      res.status(200).json("Successful signup. You may login now");
    } catch (err) {
      res.status(400).json(err.message)
    }

    if (err) { // error handling for bcrypt js
      res.status(400).json("Error in encrpyting password");
    }
  });
})


// ------Login portion here---------
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await UserModel.findOne({ email });
  // console.log(userDoc);

  try {
    const passOk = await bcrypt.compare(password, userDoc.password);
    // console.log(passOk);
    if (passOk) {
      var token = jwt.sign({ username: userDoc.username, id: userDoc.id }, privateKey);
      // console.log(token);
      res.cookie('token', token, {
        path: '/', // ensures cookie is available in entire app
      });
      res.status(200).json("Successfully signed up");
    }
    else {
      res.status(404).json("Incorrect Credentials");
    }
  }
  catch (err) {
    res.status(404).json("Invalid Credentials");
  }
})

// -------to verify user--------
app.get('/profile', async (req, res) => {
  const { token } = req.cookies; // for this we need to use cookie-parser library
  jwt.verify(token, privateKey, (err, info) => {
    if (err) {
      res.status(404).json("Invalid token");
    }
    res.json(info);
  });
})

// -------logout-------
app.post('/logout', (req, res) => {
  res.cookie('token', '').json(ok);
})