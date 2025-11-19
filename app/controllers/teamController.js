// Team controller - handles HTTP logic for team routes
const Team = require("../models/teamModel");
const Messages = require("../messages");

// Get all teams with filtering, select, sort, and pagination
const getTeams = async (req, res) => {
  try {
    // Turn query params into MongoDB operators like $gte, $lt
    const queryString = JSON.stringify(req.query);
    const queryObj = JSON.parse(
      queryString.replace(
        /\b(gt|gte|lt|lte|ne|in|nin)\b/g,
        (match) => `$${match}`
      )
    );

    // Start building the query
    let query = Team.find(queryObj);

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

    const teams = await query;
    res.status(200).json(teams);
  } catch (error) {
    res
      .status(500)
      .json({ message: Messages.server_error, error: error.message });
  }
};

// Get a single team by ID
const getTeamById = async (req, res) => {
  try {
    // Look up by the id in the route param
    const team = await Team.findById(req.params.id).select("-__v");

    if (!team) {
      return res.status(404).json({ message: Messages.team_not_found });
    }

    res.status(200).json(team);
  } catch (error) {
    res
      .status(500)
      .json({ message: Messages.server_error, error: error.message });
  }
};

// Create a new team
const createTeam = async (req, res) => {
  try {
    // Create new team from request body
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();

    const cleanTeam = await Team.findById(savedTeam._id).select("-__v");

    res.status(201).json(cleanTeam);
  } catch (error) {
    res
      .status(400)
      .json({ message: Messages.server_error, error: error.message });
  }
};

// Update a team by ID using $set
const updateTeam = async (req, res) => {
  try {
    // $set only touches the fields we send in
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedTeam) {
      return res.status(404).json({ message: Messages.team_not_found });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    res
      .status(400)
      .json({ message: Messages.server_error, error: error.message });
  }
};

// Delete a team by ID
const deleteTeam = async (req, res) => {
  try {
    // Remove the team from Mongo
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);

    if (!deletedTeam) {
      return res.status(404).json({ message: Messages.team_not_found });
    }

    res.status(200).json({ message: Messages.team_deleted });
  } catch (error) {
    res
      .status(500)
      .json({ message: Messages.server_error, error: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
