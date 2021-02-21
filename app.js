import bodyParser from 'body-parser';
import { User } from './models/user.js';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
const app = express();
import * as jwt from './token/jwt.js';
import dotenv from 'dotenv'

dotenv.config({ path: '.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 7000;
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const myLogger = (req, res, next) => {
    console.log(req.body);
    next();
    console.log(res.body);
}
app.use(myLogger);

/** */
const authMiddleware = async (req, res, next) => {
    const [, token] = req.headers.authorization.split(' ');
    try {
        const payload = await jwt.verify(token);
        const user = await User.findById(payload.user);
        if (!user)
            res.status(401).send();
        next()
    } catch (error) {
        res.status(401).send(error)
    }

}
app.get('/user', authMiddleware, (req, res) => {
    User.find().lean().exec((error, users) => {
        error ? res.status(500).send(error) : res.status(200).send(users);
    });
});

/** */
app.post('/login', async (req, res) => {

    const [, hash] = req.headers.authorization.split(' ');
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    try {
        const user = await User.findOne({ email, password })
        if (!user) {
            return res.status(401).send(user);
        }
        const token = jwt.sign({ user: user.id });
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
});

/** */
app.post('/signup', (req, res) => {
    const user = new User({
        password: req.body.password,
        email: req.body.email,
    });
    user.save((error, userSaved) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            const token = jwt.sign({ user: user.id });
            res.status(200).send({ user: userSaved, token });
        }
    });
});

app.listen(port);