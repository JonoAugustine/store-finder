const express = require("express");
const controller = require("../controllers/stores");

const router = express.Router();

router.route("/").get(controller.getStores);
router.route("/").post(controller.createStore);
router.route("/").delete(controller.deleteStore);

module.exports = router;
