import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './routes/api.js';
import auth from './routes/auth.js';

const app = express();

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);
const port = process.env.PORT || 7000;

const myLogger = (req, res, next) => {
  next();
}
app.use(myLogger);

app.use('/api', api);
app.use('/auth', auth);

app.use((req, res, next) => {
  res.status(404).send({ msg: 'Not Found!' });
});

app.listen(port);

/** */
// const authMiddleware = async (req, res, next) => {
//   const [, token] = req.headers.authorization.split(' ');
//   try {
//     const payload = await jwt.verify(token);
//     const user = await User.findById(payload.user);
//     if (!user)
//       res.status(401).send();
//     next()
//   } catch (error) {
//     res.status(401).send(error)
//   }

// }
// app.get('/user', authMiddleware, (req, res) => {
//   User.find().lean().exec((error, users) => {
//     error ? res.status(500).send(error) : res.status(200).send(users);
//   });
// });

// /** */
// app.post('/login', async (req, res) => {
//   const token = jwt.sign({ user: user.id });
//   console.log('token', token);
// });


// app.post('/signin', async (req, res) => {

//   try {
//     const user = await User.findOne({ email, password })
//     console.log(user);
//     if (!user) {
//       return res.status(401).send(user);
//     }
//     const token = jwt.sign({ user: user.id });
//     res.status(200).send({ user, token });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// /** */
// app.post('/signup', (req, res) => {
//   const user = new User({
//     password: req.body.password,
//     email: req.body.email,
//   });
//   user.save((error, userSaved) => {
//     if (error) {
//       res.status(500).send(error)
//     }
//     else {
//       const token = jwt.sign({ user: user.id });
//       res.status(200).send({ user: userSaved, token });
//     }
//   });
// });
