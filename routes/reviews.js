const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listning.js");
const Review = require("../models/review.js");
const {
  validatereview,
  isLogged,
  isReviewAuther,
} = require("../Middleware.js");
const { destroyReview, createReview } = require("../controllers/review.js");

//post rout
router.post("/", isLogged, validatereview, wrapAsync(createReview));

//delete review id
router.delete("/:reviewId", isLogged, isReviewAuther, wrapAsync(destroyReview));

module.exports = router;
