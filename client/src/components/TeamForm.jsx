// TeamForm component - form to create or update a team
import { useState } from "react";
import { createTeam, updateTeam } from "../API";

const TeamForm = ({ team, onSuccess }) => {
  // State for form inputs
  const [name, setName] = useState(team?.name || "");
  const [city, setCity] = useState(team?.city || "");
  const [foundedYear, setFoundedYear] = useState(team?.foundedYear || "");
  const [isActive, setIsActive] = useState(team?.isActive ?? true);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the team object from form data
    const teamData = {
      name,
      city,
      foundedYear: parseInt(foundedYear),
      isActive,
    };

    try {
      if (team?._id) {
        // Update existing team
        await updateTeam(team._id, teamData);
      } else {
        // Create new team
        await createTeam(teamData);
      }
      // Clear form after success
      setName("");
      setCity("");
      setFoundedYear("");
      setIsActive(true);
      // Tell parent component to refresh
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{team?._id ? "Update Team" : "Add New Team"}</h3>
      <div>
        <label>Team Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Founded Year:</label>
        <input
          type="number"
          value={foundedYear}
          onChange={(e) => setFoundedYear(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>
      </div>
      <button type="submit">{team?._id ? "Update Team" : "Add Team"}</button>
    </form>
  );
};

export default TeamForm;
