const file = require("file-system");
const fs = require("file-system");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const coffeeShops = JSON.parse(fs.readFileSync("data/coffeeshop.json"));
const batchImport = async () => {
  const item = await new MongoClient(MONGO_URI, options);

  try {
    await item.connect();
    const db = item.db("mcoc");

    await db.collection("coffeeshop").insertMany(coffeeShops);
  } catch (err) {
    console.log(err);
  }
  console.log("success!");
  item.close();
};

batchImport();
