const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { limiter } = require('./middlewares/limiter');
const router = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');

const PORT = 3000;

const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use('/', router);

app.use(errorHandler);

app.listen(PORT);
