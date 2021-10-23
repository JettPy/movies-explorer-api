const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');

const PORT = 3000;

const app = express();

app.use(express.json({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use((req, res, next) => {
  req.user = {
    _id: '6174711843355cd87538f149',
  };
  next();
});

app.use('/', router);

app.use(errorHandler);

app.listen(PORT);
