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