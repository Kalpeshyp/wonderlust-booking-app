const Listing = require("./models/listning");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLogged = (req,res,next)=>{
  if(!req.isAuthenticated()){
  req.session.redirectUrl = req.originalUrl;
    req.flash("error","you are not logged in");
   return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if (listing.owner.toString() !== res.locals.currUser._id.toString()) {
    req.flash("error", "You are not the owner of this listing.");
    return res.redirect(`/listings/${id}`);
  }
  
  next();
}

module.exports.validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validatereview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


module.exports.isReviewAuther = async (req,res,next)=>{
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.auther.equals(res.locals.currUser._id)){
    req.flash("error","You are not auther for review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}