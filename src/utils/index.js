const geocoder = require("./geocoder");

const response = (success, payload, meta) => {
  return {
    success: success,
    meta: meta || {},
    payload: payload
  };
};

module.exports = {
  response,
  geocoder
};
