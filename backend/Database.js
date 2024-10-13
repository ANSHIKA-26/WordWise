const mongoose = require("mongoose");
require('dotenv').config();

async function ConnectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Event listeners for connection errors and disconnections
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB connection lost. Trying to reconnect...');
      ConnectDb(); // Attempt to reconnect
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
}

module.exports = ConnectDb;