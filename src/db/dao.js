const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || process.argv[2];

/** Initializes MongoDB connection. */
const db_connect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { db_connect };
