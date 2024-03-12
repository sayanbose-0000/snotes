import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserModel from './models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config(); // dot env is used to get values from environment variables
const privateKey = process.env.PRIVATE_KEY;

const app = express();

const port = process.env.PORT;
const MongoURI = process.env.MONGO_URI;

app.use(express.json()); // middleware
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // for preventing cors error

mongoose.connect(MongoURI);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

const saltRounds = 10; // used in bcrypt for hasing the password




// -------------------------END POINTS----------------------------

// Signup portion here
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, saltRounds, async function (err, hash) { // hasging password
        try {
            const userDoc = await UserModel.create({
                username,
                email,
                password: hash
            });

            res.status(200).json("Successful signup. You may login now")
        } catch (err) {
            res.status(400).json(err.message)
        }

        if (err) { // error handling for bcrypt js
            res.status(400).json("Error in encrpyting password")
        }
    });
})


// Login portion here
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email });

    try {
        const passOk = await bcrypt.compare(password, userDoc.password);
        if (passOk) {
            var token = jwt.sign({ username: userDoc.username, id: userDoc.id }, privateKey);
            console.log(token);
            res.cookie('token', token);
            res.status(200).json("Successfully signed up");
        }
        else {
            res.status(404).json("Incorrect Credentials")
        }
    }
    catch (err) {
        res.status(404).json("Invalid Credentials")
    }

})
