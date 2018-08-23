const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'https://practical-allen-d788d0.netlify.com',
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

require('dotenv').load();

// Replace with your mongoLab URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'jhktest123',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: false
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
