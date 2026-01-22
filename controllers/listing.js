const Listing = require("../models/listning");

module.exports.index = async (req, res) => {
  const alllisting = await Listing.find({});
  res.render("listning/index.ejs", { alllisting });
};

module.exports.newListing = (req, res) => {
  res.render("listning/new.ejs");
};

module.exports.creteListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", filename);
  const newListing = new Listing(req.body.listing);
  console.log(req.user);
  newListing.image = { url, filename };
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "auther" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "you requested listing does not exist!");
    res.redirect("/listings");
  }
  //console.log(listing);
  res.render("listning/show.ejs", { listing });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "you requested listing does not exist!");
    res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload","/upload/w_250,e_blur:300");
  res.render("listning/edit.ejs", { listing ,originalImage});
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params; // Extract listing ID from params
  const updatedData = req.body.listing; // Extract listing data from form submission

  try {
    // Find and update the listing with the new data
    const listing = await Listing.findByIdAndUpdate(
      id,
      { ...updatedData },
      { new: true }
    );

    // If a new file is uploaded, update the image details
    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      listing.image = { url, filename }; // Update image properties
      await listing.save(); // Save the updated listing
    }

    // Redirect to the listing detail page
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error("Error updating listing:", error);
    req.flash("error", "Failed to update the listing. Please try again.");
    res.redirect(`/listings/${id}/edit`); // Redirect back to the edit form in case of an error
  }
};

//delete route

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletelis = await Listing.findByIdAndDelete(id);
  console.log(deletelis);
  req.flash("success", " Listing Deleted!");
  res.redirect("/listings");
};
