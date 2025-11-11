// Server entry point
const http = require("http");
const dotenv = require("dotenv");

const app = require("./app");
const connectToDatabase = require("./config/database");

// Load variables from .env
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectToDatabase();

    // Wrap our express app in a HTTP server
    const server = http.createServer(app);

    // Turn on the server
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    // Crash fast if something breaks
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
