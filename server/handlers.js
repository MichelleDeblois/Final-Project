"use strict";
// This is the dotenv configuration for everyone else
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const getCoffee = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("mcoc");

  db.collection("coffeeshop")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json({ status: 500, message: err });
      }
      res.status(200).json({ status: 200, data: result });
      client.close();
    });
};

const getSingleCoffeeShop = async (req, res) => {
  const id = req.params._id;
  const client = await new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("mcoc");
  await db
    .collection("coffeeshop")
    .findOne({ _id: ObjectId(id) }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, id, data: result })
        : res.status(404).json({ status: 404, id, data: "Not Found" });

      client.close();
    });
};
module.exports = {
  getCoffee,
  getSingleCoffeeShop,
};
