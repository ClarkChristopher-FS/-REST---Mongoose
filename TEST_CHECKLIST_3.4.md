Assignment 3.4 - Postman Test Checklist

Make sure your server is running: npm start

TEAMS ENDPOINT TESTS:

1. Test Query Operators (2+ operators):
   GET http://localhost:3000/api/teams?foundedYear[gte]=2000&foundedYear[lt]=2010
   - Should return teams founded between 2000-2010
   - Status: 200

2. Test Select with Query String:
   GET http://localhost:3000/api/teams?select=name,city
   - Should only return name and city fields
   - Status: 200

3. Test Sort (ascending):
   GET http://localhost:3000/api/teams?sort=foundedYear
   - Should return teams sorted by foundedYear ascending
   - Status: 200

4. Test Sort (descending):
   GET http://localhost:3000/api/teams?sort=-foundedYear
   - Should return teams sorted by foundedYear descending
   - Status: 200

5. Test Pagination:
   GET http://localhost:3000/api/teams?page=1&limit=2
   - Should return only 2 teams (first page)
   - Status: 200

6. Test Combined (all features):
   GET http://localhost:3000/api/teams?foundedYear[gte]=2000&select=name,city&sort=foundedYear&page=1&limit=2
   - Should return 2 teams, filtered, selected fields, sorted
   - Status: 200

PLAYERS ENDPOINT TESTS:

1. Test Query Operators (2+ operators):
   GET http://localhost:3000/api/players?jerseyNumber[gte]=10&jerseyNumber[lt]=20
   - Should return players with jersey 10-19
   - Status: 200

2. Test Select with Query String:
   GET http://localhost:3000/api/players?select=fullName,position
   - Should only return fullName and position fields
   - Status: 200

3. Test Sort (ascending):
   GET http://localhost:3000/api/players?sort=jerseyNumber
   - Should return players sorted by jerseyNumber ascending
   - Status: 200

4. Test Sort (descending):
   GET http://localhost:3000/api/players?sort=-jerseyNumber
   - Should return players sorted by jerseyNumber descending
   - Status: 200

5. Test Pagination:
   GET http://localhost:3000/api/players?page=1&limit=2
   - Should return only 2 players (first page)
   - Status: 200

6. Test Combined (all features):
   GET http://localhost:3000/api/players?jerseyNumber[gte]=10&select=fullName,position&sort=jerseyNumber&page=1&limit=2
   - Should return 2 players, filtered, selected fields, sorted
   - Status: 200

WHAT TO CHECK:

- Query operators work (gte, lt filters correctly)
- Select only shows specified fields
- Sort orders results correctly
- Pagination limits results (limit) and skips correctly (page)
- All status codes are 200
- No errors in console

All tests passing = Ready to submit!

