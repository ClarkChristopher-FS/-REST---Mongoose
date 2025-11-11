// Player routes - maps HTTP verbs to controller functions
const express = require("express");
const router = express.Router();

const {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/playerController");

// GET /api/players
router.get("/", getPlayers);

// GET /api/players/:id
router.get("/:id", getPlayerById);

// POST /api/players
router.post("/", createPlayer);

// PUT /api/players/:id
router.put("/:id", updatePlayer);

// DELETE /api/players/:id
router.delete("/:id", deletePlayer);

module.exports = router;
