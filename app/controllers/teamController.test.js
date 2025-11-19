// Jest tests for team controller
require("dotenv").config();
const { getTeams } = require("./teamController");
const Team = require("../models/teamModel");

// Mock the Team model
jest.mock("../models/teamModel");

describe("Team Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    // Set up req and res for each test
    req = {
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // Test 1: Select with query string
  test("should return limited fields when select is used", async () => {
    const mockTeams = [
      { name: "Team 1", city: "City 1" },
      { name: "Team 2", city: "City 2" },
    ];

    // Mock the mongoose query
    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockTeams),
    };

    Team.find.mockReturnValue(mockQuery);
    req.query = { select: "name,city" };

    await getTeams(req, res);

    expect(Team.find).toHaveBeenCalled();
    expect(mockQuery.select).toHaveBeenCalledWith("name city");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeams);
  });

  // Test 2: Select with different fields
  test("should return only name when select is name only", async () => {
    const mockTeams = [{ name: "Team 1" }, { name: "Team 2" }];

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockTeams),
    };

    Team.find.mockReturnValue(mockQuery);
    req.query = { select: "name" };

    await getTeams(req, res);

    expect(mockQuery.select).toHaveBeenCalledWith("name");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeams);
  });

  // Test 3: Pagination with skip and limit
  test("should paginate results with page 1 and limit 2", async () => {
    const mockTeams = [{ name: "Team 1" }, { name: "Team 2" }];

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockTeams),
    };

    Team.find.mockReturnValue(mockQuery);
    req.query = { page: "1", limit: "2" };

    await getTeams(req, res);

    expect(mockQuery.skip).toHaveBeenCalledWith(0); // (1-1) * 2 = 0
    expect(mockQuery.limit).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeams);
  });

  // Test 4: Pagination with different page
  test("should paginate results with page 2 and limit 5", async () => {
    const mockTeams = [{ name: "Team 6" }, { name: "Team 7" }];

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockTeams),
    };

    Team.find.mockReturnValue(mockQuery);
    req.query = { page: "2", limit: "5" };

    await getTeams(req, res);

    expect(mockQuery.skip).toHaveBeenCalledWith(5); // (2-1) * 5 = 5
    expect(mockQuery.limit).toHaveBeenCalledWith(5);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeams);
  });

  // Test 5: Sort ascending
  test("should sort results ascending by foundedYear", async () => {
    const mockTeams = [
      { name: "Team 1", foundedYear: 2000 },
      { name: "Team 2", foundedYear: 2005 },
    ];

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockTeams),
    };

    Team.find.mockReturnValue(mockQuery);
    req.query = { sort: "foundedYear" };

    await getTeams(req, res);

    expect(mockQuery.sort).toHaveBeenCalledWith("foundedYear");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeams);
  });

  // Test 6: Sort descending
  test("should sort results descending by foundedYear", async () => {
    const mockTeams = [
      { name: "Team 2", foundedYear: 2005 },
      { name: "Team 1", foundedYear: 2000 },
    ];

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockTeams),
    };

    Team.find.mockReturnValue(mockQuery);
    req.query = { sort: "-foundedYear" };

    await getTeams(req, res);

    expect(mockQuery.sort).toHaveBeenCalledWith("-foundedYear");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeams);
  });
});
