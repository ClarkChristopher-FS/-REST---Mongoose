// Player controller - handles HTTP logic for player routes
const Player = require("../models/playerModel");
const Team = require("../models/teamModel");
const Messages = require("../messages");

// Get all players with filtering, select, sort, and pagination
const getPlayers = async (req, res) => {
  try {
    // Turn query params into MongoDB operators like $gte, $lt
    const queryString = JSON.stringify(req.query);
    const queryObj = JSON.parse(
      queryString.replace(
        /\b(gt|gte|lt|lte|ne|in|nin)\b/g,
        (match) => `$${match}`
      )
    );

    // Start building the query with populate for team info
    let query = Player.find(queryObj).populate("team", "name city -_id");

    // If they want specific fields, use select
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Sort if they give us a sort param
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    // Pagination stuff - page and limit
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const players = await query;
    res.status(200).json(players);
  } catch (error) {
    res
      .status(500)
      .json({ message: Messages.server_error, error: error.message });
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
    res
      .status(500)
      .json({ message: Messages.server_error, error: error.message });
  }
};

// Create a new player (ensures team exists)
const createPlayer = async (req, res) => {
  try {
    // Check if the team id is real
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
    res
      .status(400)
      .json({ message: Messages.server_error, error: error.message });
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
    res
      .status(400)
      .json({ message: Messages.server_error, error: error.message });
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
    res
      .status(500)
      .json({ message: Messages.server_error, error: error.message });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
