// Main App component - brings everything together
import { useState } from "react";
import TeamsList from "./components/TeamsList";
import TeamForm from "./components/TeamForm";
import PlayersList from "./components/PlayersList";
import PlayerForm from "./components/PlayerForm";
import "./App.css";

const App = () => {
  // State to track which section we're viewing
  const [activeTab, setActiveTab] = useState("teams");
  // State to trigger refresh of lists
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to refresh lists after adding/updating
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="app">
      <h1>Team & Player Manager</h1>

      {/* Tabs to switch between Teams and Players */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab("teams")}
          className={activeTab === "teams" ? "active" : ""}
        >
          Teams
        </button>
        <button
          onClick={() => setActiveTab("players")}
          className={activeTab === "players" ? "active" : ""}
        >
          Players
        </button>
      </div>

      {/* Show Teams section */}
      {activeTab === "teams" && (
        <div className="section">
          <TeamForm onSuccess={handleRefresh} />
          <TeamsList key={refreshKey} />
        </div>
      )}

      {/* Show Players section */}
      {activeTab === "players" && (
        <div className="section">
          <PlayerForm onSuccess={handleRefresh} />
          <PlayersList key={refreshKey} />
        </div>
      )}
    </div>
  );
};

export default App;
