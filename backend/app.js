const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post= require('./models/post');
const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://admin:yTxNZ2dydARYUj5@mongodbserver-bf1eh.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() =>{
    console.log('connected to database!');
  }).catch(()=>{
    console.log('connection to database failed!');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });

});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents =>{
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents
    })
  }).catch({})
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result =>{
    res.status(200).json({message: "Posts deleted!"})
  }).catch({})
});

module.exports = app;