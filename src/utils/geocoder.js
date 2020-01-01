const coder = require("node-geocoder");

const geocoder = coder({
  provider: process.env.GEOCODER_PROVIDER,
  httpAddapter: "https",
  apiKey: process.env.GEOCODER_KEY,
  formatter: null
});

module.exports = geocoder;
