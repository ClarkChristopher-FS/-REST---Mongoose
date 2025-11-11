// MongoDB connection helper using Mongoose
const mongoose = require("mongoose");

// This function connects our app to MongoDB
const connectToDatabase = async () => {
  try {
    // Hit the connection string from .env
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");
  } catch (error) {
    // Show why the database failed so we can fix it fast
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectToDatabase;
