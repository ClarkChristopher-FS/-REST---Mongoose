// Express application setup
const express = require("express");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Team API is running" });
});

// Mount API routes
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);

module.exports = app;
