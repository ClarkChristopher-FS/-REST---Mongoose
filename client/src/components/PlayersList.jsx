// PlayersList component - shows all players from the database
import { useState, useEffect } from "react";
import { fetchPlayers, deletePlayer } from "../API";

const PlayersList = () => {
  // State to hold our players array
  const [players, setPlayers] = useState([]);
  // State to track if we're loading data
  const [loading, setLoading] = useState(true);

  // Load players when component first mounts
  useEffect(() => {
    loadPlayers();
  }, []);

  // Function to get all players from backend
  const loadPlayers = async () => {
    try {
      setLoading(true);
      const data = await fetchPlayers();
      setPlayers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading players:", error);
      setLoading(false);
    }
  };

  // Function to delete a player
  const handleDelete = async (id) => {
    try {
      await deletePlayer(id);
      // Reload players after deleting
      loadPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  if (loading) {
    return <div>Loading players...</div>;
  }

  return (
    <div>
      <h2>Players</h2>
      <button onClick={loadPlayers}>Refresh Players</button>
      {players.length === 0 ? (
        <p>No players found. Add one below!</p>
      ) : (
        <ul>
          {players.map((player) => (
            <li key={player._id}>
              <strong>{player.fullName}</strong> - {player.position} (#
              {player.jerseyNumber})
              {player.team && <span> - Team: {player.team.name}</span>}
              <button onClick={() => handleDelete(player._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayersList;
