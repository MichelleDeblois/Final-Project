"use strict";
const express = require("express");
const morgan = require("morgan");

const {
  getCoffee,
  getSingleCoffeeShop,
  getProfilePage,
  addUser,
  getUsers,
  addReccomendation,
  removeReccomendation,
  addReview,
  getFollowingUser,
  addfriend,
  removefriend,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/coffeeshop", getCoffee)
  .get("/coffeeshop/:_id", getSingleCoffeeShop)
  .get("/profile/:_id", getProfilePage)
  .post("/signup/newuser", addUser)
  .get("/users", getUsers)
  .patch("/coffeeshop/:_id", addReccomendation)
  .patch("/coffeeshop/remove/:_id", removeReccomendation)
  .patch("/coffeeshop/review/:_id", addReview)
  .get("/feed/:_id", getFollowingUser)
  .patch("/profile/addfriend/:_id", addfriend)
  .patch("/profile/removefriend/:_id", removefriend)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
