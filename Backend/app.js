var express = require('express');
const bodyParser=require("body-parser");
const cors=require('cors');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("./app_api/models/db");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter=require("./app_api/routes/index");
const { log } = require('console');
var app = express();
app.use(cors());


app.use(logger('dev'));

// app.use(express.json());
// express.urlencoded({ extended:  false});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use("/api",apiRouter);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cors({
    origin: 'http://localhost:5173',
  }));

module.exports = app;
