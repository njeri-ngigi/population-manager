# Population Manager
A node API that uses Mongodb to record population of towns. The API allows users to:
- create locations
- retrieve location by name
- retrieve all locations
- delete a location
- create many locations by uploading a file
- save all locations to a file and stream that file in the response

## Setting up
- clone this repo
- install the dependencies using `yarn install`
- create a `.env` file similar to the `.env.sample` on the root directory of this project
- start the serve and test out the endpoints on postman

## Endpoints available
| Endpoints         | Method  | Description  |
|-------------------|---------|--------------|
|  /location        | POST    | Create a new location  |
|  /location        | GET     | Get all locations stored in the database  |
|  /location/:name  | GET     | Get alocation's details by name  |
|  /location/:name  | DELETE  | Delete a location by name  |
|  /locations       | POST    | Create locations form a file upload  |
|  /locations       | GET     | save locations to a file  |

