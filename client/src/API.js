// API service - handles all calls to our backend
import axios from "axios";

// Base URL - Vite proxy will forward /api to localhost:3000
const API_URL = "/api";

// Teams API calls
export const fetchTeams = async () => {
  const response = await axios.get(`${API_URL}/teams`);
  return response.data;
};

export const fetchTeamById = async (id) => {
  const response = await axios.get(`${API_URL}/teams/${id}`);
  return response.data;
};

export const createTeam = async (teamData) => {
  const response = await axios.post(`${API_URL}/teams`, teamData);
  return response.data;
};

export const updateTeam = async (id, teamData) => {
  const response = await axios.put(`${API_URL}/teams/${id}`, teamData);
  return response.data;
};

export const deleteTeam = async (id) => {
  const response = await axios.delete(`${API_URL}/teams/${id}`);
  return response.data;
};

// Players API calls
export const fetchPlayers = async () => {
  const response = await axios.get(`${API_URL}/players`);
  return response.data;
};

export const fetchPlayerById = async (id) => {
  const response = await axios.get(`${API_URL}/players/${id}`);
  return response.data;
};

export const createPlayer = async (playerData) => {
  const response = await axios.post(`${API_URL}/players`, playerData);
  return response.data;
};

export const updatePlayer = async (id, playerData) => {
  const response = await axios.put(`${API_URL}/players/${id}`, playerData);
  return response.data;
};

export const deletePlayer = async (id) => {
  const response = await axios.delete(`${API_URL}/players/${id}`);
  return response.data;
};
