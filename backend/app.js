const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const postsRoutes = require("./routes/adminroutes");
const userRoutes = require("./routes/loginauth");
const menRoutes = require("./routes/menroutes");
const womenRoutes = require("./routes/womenroutes");
// const assert = require('assert');
const allCategoryRoutes = require("./routes/allCategoryName");
autoIncrement = require('mongoose-auto-increment');
const url = 'localhost:27017/myDatabase';

const dbName = 'myproject';
const app = express();
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true}) .then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});
//mongoose.connect('')
/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
}); */
/*MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
}); */
//mongodb+srv://tiennesdm:<password>@meanstack-srts7.mongodb.net/test
/*mongoose
  .connect(
    "mongodb+srv://tiennesdm:n5BfiMQw9XNUZfHs@meanstack-srts7.mongodb.net/fashion?retryWrites=true",
  //"localhost:27017/myDatabase",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }

  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  }); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));
//app.use(app.router);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product",  menRoutes);
app.use("/api/women", womenRoutes);
app.use("/api/allCategoryName", allCategoryRoutes);


module.exports = app;
