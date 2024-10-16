const mongoose = require("mongoose");

async function ConnectDb() {
  try {
    // const DatabaseConnect = process.env.DatabaseConnect;
    await mongoose.connect(
      //"mongodb://localhost:27017/" //establish database connection   // mongodb+srv://username:Password@cluster0.8ysl0ky.mongodb.net/DatabseName
      "mongodb+srv://sourabhsinghrawat782:PzR2Sxd0SVViImI7@cluster0.jsmht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("connected to database");
  } catch (error) {
    console.log("error :", error);
  }
}

module.exports = ConnectDb;
