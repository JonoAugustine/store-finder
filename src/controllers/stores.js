const { Store } = require("../models");
const { response } = require("../utils");

/**
 * \@desc Get all Stores
 * \@route GET /api/v1/stores
 * \@access Public
 */
exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    return res.status(200).json(response(true, stores, { count: stores.length }));
  } catch (err) {
    console.error(err);
    res.status(500).json(response(false, null, { error: "Internal Server Error" }));
  }
};

/**
 * \@desc Create new Store
 * \@route POST /api/v1/stores
 * \@access Public
 */
exports.createStore = async (req, res, next) => {
  if (
    Object.keys(req.body).includes("storeID") &&
    Object.keys(req.body).includes("address")
  ) {
    try {
      const store = await Store.create(req.body);
      return res.status(200).json(response(true, store));
    } catch (err) {
      console.error(err);
      if (err.code == 11000) {
        res.status(409).json(response(false, null, { error: "Duplicate store" }));
      } else {
        res.status(500).json(response(false, null, { error: "Internal Server Error" }));
      }
    }
  } else {
    res
      .status(400)
      .json(response(false, null, { error: "Missing Fields", request: req.body }));
  }
};

exports.updateStore = async (req, res, next) => {
  try {
  } catch (err) {
    console.error(err);
  }
};

/**
 * \@desc Delete Store
 * \@route DELETE /api/v1/stores
 * \@access Public
 */
exports.deleteStore = async (req, res, next) => {
  const id = req.body.storeID;
  if (id) {
    try {
      const store = await Store.findOne({ storeID: id });
      const op = await Store.deleteOne({ storeID: id });
      res.status(200).json(response(true, store, { count: op.deletedCount }));
    } catch (err) {
      res.status(500).json(response(false, null, { error: "Internal" }));
    }
  } else {
    res.status(400).json(response(false, null, { error: "Missing ID" }));
  }
};
