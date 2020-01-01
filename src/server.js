const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

module.exports = async () => {
  // Load ENV variables
  dotenv.config({ path: path.join(__dirname, "/config.env") });

  // Initialize Server

  const PORT = process.env.PORT || 7000;

  const server = express();

  server
    // Use JSON body parser
    .use(express.json())
    // Use CORS
    .use(require("cors")())
    // Use store API router
    .use("/api/v1/stores", require("./routes/stores"))
    // Set static files
    .use(express.static(path.join(__dirname, "public")));

  // Initialize DB connection

  // Initialize DB
  await require("./db/dao").db_connect();

  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
};
