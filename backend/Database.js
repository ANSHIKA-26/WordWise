const mongoose = require("mongoose");

async function ConnectDb() {
  try {
    // const DatabaseConnect = process.env.DatabaseConnect;
    await mongoose.connect(
      process.env.MONGODB_URI 
    );

    console.log("connected to database");
  } catch (error) {
    console.log("error :", error);
  }
}

module.exports = ConnectDb;
