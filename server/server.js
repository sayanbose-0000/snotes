import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import UserModel from './models/UserModel.js';
import PostModel from './models/PostModel.js';

dotenv.config(); // dot env is used to get values from environment variables
const privateKey = process.env.PRIVATE_KEY;

const app = express();

const port = process.env.PORT;
const MongoURI = process.env.MONGO_URI;
const frontURL = process.env.FRONT_URL;

const corsOptions = {
  origin: frontURL,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(express.json()); // middleware
app.use(cors(corsOptions)); // for preventing cors error
app.use(cookieParser()); // need this so that the  profile endpoint where we want to access the cookie using req.cookie works

mongoose.connect(MongoURI);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

const saltRounds = 10; // used in bcrypt for hasing the password


// -------------------------END POINTS----------------------------

// -------- Signup portion here ---------
app.post('/server/signup', (req, res) => {
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


// ------ Login portion here ---------
app.post('/server/login', async (req, res) => {
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
        httpOnly: true,
        maxAge: 30 * 60 * 60 * 24 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
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


// ------- to verify user --------
app.get('/server/profile', async (req, res) => {
  const { token } = req.cookies; // for this we need to use cookie-parser library
  jwt.verify(token, privateKey, (err, info) => {
    if (err) {
      res.status(404).json("Invalid token");
    }
    res.json(info);
  });
})


// ------- logout -------
app.post('/server/logout', (req, res) => {
  res.cookie('token', '', {
    path: '/', // ensures cookie is available in entire app
    httpOnly: true,
    maxAge: 30 * 60 * 60 * 24 * 1000,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true
  });
  // res.clearCookie('token', {
  //   path: "/",
  //   httpOnly: true,
  // })
  // res.clearCookie('token', { domain: frontURL, path: '/' });
  res.json("ok");
})


// -------- new note ----------
app.post('/server/newnote', (req, res) => {
  const { title, content, date } = req.body;
  const { token } = req.cookies; // for this we need to use cookie-parser library
  jwt.verify(token, privateKey, async (err, info) => {
    if (err) {
      res.status(404).json("Make sure you are logged in");
    }
    const author = info.id;
    try {
      const userCreatedNote = await PostModel.create({
        title,
        content,
        date,
        author
      });
      res.status(200).json("Added note");
    } catch (err) {
      res.status(400).json(err.message)
    }
  });
})

// --------- fetch notes ----------
app.post('/server/getnote', async (req, res) => {
  const { id } = req.body;
  try {
    const userNotes = await PostModel.find({ author: id }).sort({ date: -1 });
    res.status(200).json(userNotes);
  } catch (err) {
    res.status(400).json(err.message)
  }
})

// ------ delete note ------------
app.post('/server/deletenote', async (req, res) => {
  const { id } = req.body;
  // console.log(id)
  try {
    const userNotes = await PostModel.deleteOne({ _id: id })
    res.status(200).json(userNotes);
  } catch (err) {
    res.status(400).json(err.message)
  }
})


// ---------- find One -------------
app.get("/server/findonenote/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userNotes = await PostModel.findById(id)
    res.status(200).json(userNotes);
  } catch (err) {
    res.status(400).json(err.message)
  }
})


// ------ edit note ------------
app.put('/server/editnote', (req, res) => {
  const { title, content, date } = req.body;
  const { id } = req.params;
  const { token } = req.cookies; // for this we need to use cookie-parser library
  jwt.verify(token, privateKey, async (err, info) => {
    if (err) {
      res.status(404).json("Make sure you are logged in");
    }
    const author = info.id;
    try {
      const userCreatedNote = await PostModel.updateOne(
        {
          _id: id,
        },
        {
          title,
          content,
          date,
          author
        });
      res.status(200).json("Added note");
    } catch (err) {
      res.status(400).json(err.message)
    }
  });
})