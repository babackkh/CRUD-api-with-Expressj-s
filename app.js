const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const portfolioRouter = require('./routes/portfolio');
const storyRouter = require('./routes/story');
const storyImagesRouter = require('./routes/storyImages');

const app = express();
dotenv.config();

const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect('mongodb://mongo:mongo@mdb:27017/najib?authSource=admin', DB_OPTIONS)
  .then(() => console.log('Successfully Connected to Database!'))
  .catch((errorMsg) => console.log(`Connection Failed Due to: ${errorMsg}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/user', userRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/story', storyRouter);
app.use('/api/story/images', storyImagesRouter);

module.exports = app;
