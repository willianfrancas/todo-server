import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './routes/api.js';
import auth from './routes/auth.js';

const app = express();
const port = process.env.PORT || 7000;

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", 'https://my-todo-mongodb.herokuapp.com');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
