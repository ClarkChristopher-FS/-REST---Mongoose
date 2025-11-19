REST and Mongoose API

Simple Express plus MongoDB project. Two collections: teams and players. A player belongs to a team.

Quick setup:

1. Add these values to .env (if missing):
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/bookshelf
2. Run these commands:
   npm install
   npm start

What the app shows:

- Connect Mongoose to MongoDB
- Routes stay clean because controllers hold the logic
- CRUD for teams and players
- Basic validation so we do not save bad data

Postman video checklist
Teams:

- POST /api/teams
  Body example:
  {
  "name": "Orlando Owls",
  "city": "Orlando",
  "foundedYear": 2005,
  "isActive": true
  }
- GET /api/teams
  Query string examples:
  - /api/teams?foundedYear[gte]=2000 (teams founded 2000 or later)
  - /api/teams?foundedYear[lt]=2010 (teams founded before 2010)
  - /api/teams?foundedYear[gte]=2000&foundedYear[lt]=2010 (between 2000-2010)
  - /api/teams?isActive=true (only active teams)
  - /api/teams?select=name,city (only show name and city fields)
  - /api/teams?sort=foundedYear (sort by foundedYear ascending)
  - /api/teams?sort=-foundedYear (sort by foundedYear descending)
  - /api/teams?page=1&limit=5 (pagination - page 1, 5 items per page)
  - /api/teams?foundedYear[gte]=2000&sort=foundedYear&page=1&limit=5 (combined filters)
- GET /api/teams/:id
- PUT /api/teams/:id
  Body example:
  {
  "city": "Orlando",
  "foundedYear": 2010,
  "isActive": true
  }
- DELETE /api/teams/:id

Players:

- POST /api/players
  Body:
  {
  "fullName": "Chris Cole",
  "position": "Forward",
  "jerseyNumber": 9,
  "isCaptain": false,
  "team": "paste the team id"
  }
- GET /api/players
  Query string examples:
  - /api/players?jerseyNumber[gte]=10 (jersey number 10 or higher)
  - /api/players?jerseyNumber[lt]=20 (jersey number less than 20)
  - /api/players?jerseyNumber[gte]=10&jerseyNumber[lt]=20 (between 10-19)
  - /api/players?position=Forward (only forwards)
  - /api/players?isCaptain=true (only captains)
  - /api/players?select=fullName,position (only show fullName and position)
  - /api/players?sort=jerseyNumber (sort by jerseyNumber ascending)
  - /api/players?sort=-jerseyNumber (sort by jerseyNumber descending)
  - /api/players?page=1&limit=5 (pagination - page 1, 5 items per page)
  - /api/players?jerseyNumber[gte]=10&sort=jerseyNumber&page=1&limit=5 (combined filters)
- GET /api/players/:id
- PUT /api/players/:id
  Body example:
  {
  "position": "Center",
  "isCaptain": true
  }
- DELETE /api/players/:id

Status codes:

- 201 when something gets created
- 200 when a read or update works
- 204 when delete works

- 400 when validation fails
- 404 when the id is not found
- 500 if the server crashes or Mongo is down

Video link - https://youtu.be/v1avNg9yPCo

Module 2 tests Video - https://youtu.be/m5kfgJSzwFM
