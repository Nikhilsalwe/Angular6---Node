const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message:"Post Added Successfully",
      postId: createdPost.id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
 Post.find().then(documents => {
   res.status(200).json({
     message:"Posts fetch successfully!",
     posts:documents
   });
 });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted"});
  })
});

module.exports = app;
