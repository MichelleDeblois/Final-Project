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

const getProfilePage = async (req, res) => {
  const id = req.params._id;
  const client = await new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("mcoc");
  await db.collection("users").findOne({ _id: ObjectId(id) }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, id, data: result })
      : res.status(404).json({ status: 404, id, data: "Not Found" });

    client.close();
  });
};

const addUser = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  const user = req.body.flight;

  try {
    await client.connect();
    const db = client.db("mcoc");
    await db.collection("users").insertOne(req.body);

    res.status(200).json({
      status: 200,
      message: "user created",
      data: req.body,
    });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("mcoc");

  db.collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json({ status: 500, message: err });
      }
      res.status(200).json({ status: 200, data: result });
      client.close();
    });
};
// add a recconmendation
const addReccomendation = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  const userId = req.body.userId;
  const shopId = req.body.shopId;

  try {
    await client.connect();
    const db = client.db("mcoc");
    // updating COFFEE SHOPS
    const updateCoffeeShop = await db
      .collection("coffeeshop")
      .findOne({ _id: ObjectId(shopId) });
    const newValue = {
      $set: {
        reccomendedBy: [...updateCoffeeShop.reccomendedBy, userId],
      },
    };

    const reccomended = await db
      .collection("coffeeshop")
      .updateOne({ _id: ObjectId(shopId) }, newValue);

    //updating CURRENT USER
    const updateCurrentUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
    //change name of value
    const newValue2 = {
      $set: {
        reccomended: [...updateCurrentUser.reccomended, shopId],
      },
    };

    const reccomended2 = await db
      .collection("users")
      .updateOne({ _id: ObjectId(userId) }, newValue2);

    // console.log(reccomended);
    return res
      .status(200)
      .json({ status: 200, data: { reccomended, reccomended2 } });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const removeReccomendation = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  const userId = req.body.userId;
  const shopId = req.params._id;

  try {
    await client.connect();
    const db = client.db("mcoc");
    // updating COFFEE SHOPS
    const coffeeShop = await db
      .collection("coffeeshop")
      .findOne({ _id: ObjectId(shopId) });
    const fileteredCoffeeShopReccomendedBy = coffeeShop.reccomendedBy.filter(
      (e) => {
        return e !== userId;
      }
    );
    const newCoffeeShopReccomendedBy = {
      $set: {
        reccomendedBy: fileteredCoffeeShopReccomendedBy,
      },
    };

    const updateCoffeeShop = await db
      .collection("coffeeshop")
      .updateOne({ _id: ObjectId(shopId) }, newCoffeeShopReccomendedBy);

    //updating CURRENT USER
    const currentUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(userId) });

    //change name of value

    const filteredUserReccomended = currentUser.reccomended.filter((e) => {
      return e !== shopId;
    });
    const newUserReccomended = {
      $set: {
        reccomended: filteredUserReccomended,
      },
    };

    const updateUser = await db
      .collection("users")
      .updateOne({ _id: ObjectId(userId) }, newUserReccomended);

    // console.log(reccomended);
    return res.status(200).json({
      status: 200,
      data: { reccomended: updateCoffeeShop, reccomended2: updateUser },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const addReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.body.userId;
  const reviewadded = { review: req.body.review, userId: userId };
  const shopId = req.params._id;

  try {
    await client.connect();
    const db = client.db("mcoc");

    const coffeeShops = await db
      .collection("coffeeshop")
      .findOne({ _id: ObjectId(shopId) });
    const newReview = {
      $set: {
        reviews: [...coffeeShops.reviews, reviewadded],
      },
    };

    const updatedReview = await db
      .collection("coffeeshop")
      .updateOne({ _id: ObjectId(shopId) }, newReview);

    return res.status(200).json({ status: 200, reviews: updatedReview });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const getFollowingUser = async (req, res) => {
  const id = req.params._id;
  const client = await new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("mcoc");
  await db.collection("users").findOne({ _id: ObjectId(id) }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, id, data: result })
      : res.status(404).json({ status: 404, id, data: "Not Found" });

    client.close();
  });
};

module.exports = {
  getCoffee,
  getSingleCoffeeShop,
  getProfilePage,
  addUser,
  getUsers,
  addReccomendation,
  removeReccomendation,
  addReview,
  getFollowingUser,
};
