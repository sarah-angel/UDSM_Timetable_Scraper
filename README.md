# UDSM_Timetable_Scraper

Gets session details for a course from the UDSM timetable website

## Installation
1. Clone this repo.
2. Run `npm install` to install dependencies.
3. Run `npm run development` to start the server  

Access api's at http://localhost:3001/

## REST API
Get timetable for a course
### Request
GET /api/course/:courseID

`$ curl -i -H  'Accept: application/json'  http://localhost:3001/api/course/CS335`


               
                  

