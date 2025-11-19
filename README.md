REST and Mongoose API

Express plus MongoDB project. Two collections: teams and players. A player belongs to a team.

Setup:

1. Add these to your .env file:
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/bookshelf

2. Run these commands:
   npm install
   npm start

Assignment Requirements:

Both GET /api/teams and GET /api/players have:

- Query operators (at least 2 per endpoint) - use $gte, $lt, etc in query strings
- Select - exclude fields using ?select=field1,field2
- Sort - order results using ?sort=field or ?sort=-field
- Pagination - use ?page=1&limit=10 to control results

All features use query strings in the URL.

Examples in Postman:

Teams:

POST /api/teams

- Body example (use raw JSON):
  {
  "name": "Orlando Owls",
  "city": "Orlando",
  "foundedYear": 2005,
  "isActive": true
  }

GET /api/teams

Requirements met:

- Query operators: ?foundedYear[gte]=2000&foundedYear[lt]=2010 (gte and lt)
- Query operators: ?isActive=true
- Select: ?select=name,city (excludes other fields)
- Sort: ?sort=foundedYear or ?sort=-foundedYear
- Pagination: ?page=1&limit=5

All together: ?foundedYear[gte]=2000&isActive=true&select=name,city&sort=foundedYear&page=1&limit=5

GET /api/teams/:id

- Get one team by id

PUT /api/teams/:id

- Update a team
- Body example:
  {
  "city": "Orlando",
  "foundedYear": 2010,
  "isActive": true
  }

DELETE /api/teams/:id

- Delete a team

Players:

POST /api/players

- Body (raw JSON):
  {
  "fullName": "Chris Cole",
  "position": "Forward",
  "jerseyNumber": 9,
  "isCaptain": false,
  "team": "paste team id here"
  }

GET /api/players

Requirements:

- Query operators: ?jerseyNumber[gte]=10&jerseyNumber[lt]=20 (gte and lt)
- Query operators: ?position=Forward or ?isCaptain=true
- Select: ?select=fullName,position (excludes other fields)
- Sort: ?sort=jerseyNumber or ?sort=-jerseyNumber
- Pagination: ?page=1&limit=5

All together: ?jerseyNumber[gte]=10&position=Forward&select=fullName,position&sort=jerseyNumber&page=1&limit=5

GET /api/players/:id

- Get one player

PUT /api/players/:id

- Update a player
- Body:
  {
  "position": "Center",
  "isCaptain": true
  }

DELETE /api/players/:id

- Delete a player

Status codes:

- 201 when you create something
- 200 when read or update works
- 204 when delete works
- 400 when validation fails
- 404 when id not found
- 500 if server crashes or mongo is down
