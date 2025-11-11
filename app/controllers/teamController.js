// Team controller - handles HTTP logic for team routes
const Team = require("../models/teamModel");

// Get all teams
const getTeams = async (req, res) => {
  try {
    // Pull every team from Mongo
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single team by ID
const getTeamById = async (req, res) => {
  try {
    // Look up by the id in the route param
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new team
const createTeam = async (req, res) => {
  try {
    // Build a new team using the request body
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();

    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a team by ID
const deleteTeam = async (req, res) => {
  try {
    // Remove the team from Mongo
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
