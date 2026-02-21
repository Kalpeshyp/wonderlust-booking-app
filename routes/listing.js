const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listning.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLogged, isOwner, validatelisting } = require("../Middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  //index route
  .get(wrapAsync(listingControllers.index))
  //create route
  .post(
    isLogged,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingControllers.creteListing),
  );

//new route
router.get("/new", isLogged, listingControllers.newListing);

router
  .route("/:id")
  //show rout
  .get(wrapAsync(listingControllers.showListing))
  // Update Route
  .put(
    upload.single("listing[image]"),
    isOwner,
    isLogged,
    listingControllers.updateListing,
  )
  //delete route
  .delete(isLogged, isOwner, wrapAsync(listingControllers.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLogged,
  isOwner,
  wrapAsync(listingControllers.editListing),
);

module.exports = router;
