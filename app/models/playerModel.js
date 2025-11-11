// Player model - represents a player that belongs to a team
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    position: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    jerseyNumber: {
      type: Number,
      required: true,
      min: 0,
      max: 99,
    },
    isCaptain: {
      type: Boolean,
      default: false,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
