const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { DEV_DATA_BASE, ORIGINS } = require('./utils/config');

const { NODE_ENV, PORT = 3000, DATA_BASE } = process.env;

const app = express();

app.use(cors({ credentials: true, origin: ORIGINS }));
app.use(helmet());
app.use(express.json({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : DEV_DATA_BASE);

app.use(requestLogger);

app.use(limiter);

app.use('/', router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
