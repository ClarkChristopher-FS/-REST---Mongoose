// PlayerForm component - form to create or update a player
import { useState, useEffect } from "react";
import { createPlayer, updatePlayer, fetchTeams } from "../API";

const PlayerForm = ({ player, onSuccess }) => {
  // State for form inputs
  const [fullName, setFullName] = useState(player?.fullName || "");
  const [position, setPosition] = useState(player?.position || "");
  const [jerseyNumber, setJerseyNumber] = useState(player?.jerseyNumber || "");
  const [isCaptain, setIsCaptain] = useState(player?.isCaptain || false);
  const [teamId, setTeamId] = useState(player?.team?._id || player?.team || "");
  const [teams, setTeams] = useState([]);

  // Load teams when component mounts (so we can pick a team)
  useEffect(() => {
    loadTeams();
  }, []);

  // Function to get all teams for the dropdown
  const loadTeams = async () => {
    try {
      const data = await fetchTeams();
      setTeams(data);
    } catch (error) {
      console.error("Error loading teams:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the player object from form data
    const playerData = {
      fullName,
      position,
      jerseyNumber: parseInt(jerseyNumber),
      isCaptain,
      team: teamId,
    };

    try {
      if (player?._id) {
        // Update existing player
        await updatePlayer(player._id, playerData);
      } else {
        // Create new player
        await createPlayer(playerData);
      }
      // Clear form after success
      setFullName("");
      setPosition("");
      setJerseyNumber("");
      setIsCaptain(false);
      setTeamId("");
      // Tell parent component to refresh
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{player?._id ? "Update Player" : "Add New Player"}</h3>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Jersey Number:</label>
        <input
          type="number"
          value={jerseyNumber}
          onChange={(e) => setJerseyNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Team:</label>
        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          required
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name} - {team.city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isCaptain}
            onChange={(e) => setIsCaptain(e.target.checked)}
          />
          Captain
        </label>
      </div>
      <button type="submit">
        {player?._id ? "Update Player" : "Add Player"}
      </button>
    </form>
  );
};

export default PlayerForm;
