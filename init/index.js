const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listning.js");
main()
  .then((res) => {
    console.log("Connected to the database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

let initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6793af012d3bffb7827440ad",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initilized");
};

initDB();
