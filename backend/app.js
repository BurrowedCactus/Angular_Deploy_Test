const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

const app = express();
//JWT_KEY: a_password_that_is_very_long

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(
   "mongodb+srv://admin:yTxNZ2dydARYUj5@mongodbserver-bf1eh.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() =>{
    console.log('connected to database!');
  })
  .catch(()=>{
    console.log('connection to database failed!');
  });

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
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/posts", postsRoutes);

module.exports = app;
