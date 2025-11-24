// TeamsList component - shows all teams from the database
import { useState, useEffect } from "react";
import { fetchTeams, deleteTeam } from "../API";

const TeamsList = () => {
  // State to hold our teams array
  const [teams, setTeams] = useState([]);
  // State to track if we're loading data
  const [loading, setLoading] = useState(true);

  // Load teams when component first mounts
  useEffect(() => {
    loadTeams();
  }, []);

  // Function to get all teams from backend
  const loadTeams = async () => {
    try {
      setLoading(true);
      const data = await fetchTeams();
      setTeams(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading teams:", error);
      setLoading(false);
    }
  };

  // Function to delete a team
  const handleDelete = async (id) => {
    try {
      await deleteTeam(id);
      // Reload teams after deleting
      loadTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  if (loading) {
    return <div>Loading teams...</div>;
  }

  return (
    <div>
      <h2>Teams</h2>
      <button onClick={loadTeams}>Refresh Teams</button>
      {teams.length === 0 ? (
        <p>No teams found. Add one below!</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id}>
              <strong>{team.name}</strong> - {team.city} (Founded:{" "}
              {team.foundedYear})
              <button onClick={() => handleDelete(team._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamsList;
