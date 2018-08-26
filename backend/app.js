const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts')

var app = express();
//"mongodb+srv://max:q9Rpf4vpUApUaOjR@cluster0-lv9gj.mongodb.net/node-angular?retryWrites=true"

mongoose.connect("mongodb+srv://Nikhil:L1x8kftvoKdTLxe6@cluster0-lv9gj.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  }).catch((err) => {
    console.log('Connection failed to MongoDB', err);
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/api/posts",postsRoutes);

module.exports = app;
