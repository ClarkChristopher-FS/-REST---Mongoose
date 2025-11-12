// Player controller - handles HTTP logic for player routes
const Player = require("../models/playerModel");
const Team = require("../models/teamModel");
const Messages = require("../messages");

const playerQuery = () =>
  Player.find().select("-__v").populate("team", "name city -_id");

// Get all players (with team info)
const getPlayers = async (req, res) => {
  try {
    // Populate grabs team name and city so we can see the relation
    const players = await playerQuery();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: Messages.server_error, error: error.message });
  }
};

// Get a single player by ID
const getPlayerById = async (req, res) => {
  try {
    // Look up the player and bring back the team info
    const player = await Player.findById(req.params.id)
      .select("-__v")
      .populate("team", "name city -_id");

    if (!player) {
      return res.status(404).json({ message: Messages.player_not_found });
    }

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: Messages.server_error, error: error.message });
  }
};

// Create a new player (ensures team exists)
const createPlayer = async (req, res) => {
  try {
    // Make sure the team id coming in is real
    const teamExists = await Team.findById(req.body.team);

    if (!teamExists) {
      return res.status(400).json({ message: Messages.team_not_found });
    }

    // Save the player once the team is verified
    const newPlayer = new Player(req.body);
    await newPlayer.save();

    const cleanPlayer = await Player.findById(newPlayer._id)
      .select("-__v")
      .populate("team", "name city -_id");

    res.status(201).json(cleanPlayer);
  } catch (error) {
    res.status(400).json({ message: Messages.server_error, error: error.message });
  }
};

// Update a player by ID using $set
const updatePlayer = async (req, res) => {
  try {
    if (req.body.team) {
      // Re-check team if they try to move the player
      const teamExists = await Team.findById(req.body.team);

      if (!teamExists) {
        return res.status(400).json({ message: Messages.team_not_found });
      }
    }

    // $set only updates what we send in the body
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .populate("team", "name city -_id");

    if (!updatedPlayer) {
      return res.status(404).json({ message: Messages.player_not_found });
    }

    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ message: Messages.server_error, error: error.message });
  }
};

// Delete a player
const deletePlayer = async (req, res) => {
  try {
    // Drop the player document from Mongo
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);

    if (!deletedPlayer) {
      return res.status(404).json({ message: Messages.player_not_found });
    }

    res.status(200).json({ message: Messages.player_deleted });
  } catch (error) {
    res.status(500).json({ message: Messages.server_error, error: error.message });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
