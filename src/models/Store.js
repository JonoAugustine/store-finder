const mongoose = require("mongoose");
const { geocoder } = require("../utils");

const StoreSchema = new mongoose.Schema({
  storeID: {
    type: String,
    required: [true, "Store requires a unique ID"],
    unique: true,
    trim: true,
    maxlength: [15],
    minlength: [6]
  },
  address: {
    type: String,
    required: [true, "Store requires an address"],
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String,
    zipcode: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// GeoCoder middleware to create location
StoreSchema.pre("save", async function(next) {
  const loc = (await geocoder.geocode(this.address))[0];
  this.location = {
    type: "Point",
    coordinates: [loc.longitude, loc.latitude],
    formattedAddress: loc.formattedAddress,
    zipcode: loc.zipcode
  };

  // ignore address input
  this.address = undefined;

  // Continue
  next();
});

module.exports = mongoose.model("Store", StoreSchema);
