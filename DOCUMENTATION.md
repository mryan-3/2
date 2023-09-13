##   API Documentation

This document outlines the endpoints, request/response formats, sample usage, limitations, and setup instructions for the API.

##  Endpoints

1. Fetch all users (READ)
Endpoint: GET /api
Description: Retrieves a list of all users from the database.


3. Fetch user by ID or name (READ)
Endpoint: GET /api/:params
Description: Retrieves a user by either their ID or name from the database. The parameter :params should be either a valid user ID or name.


5. Add a new user (CREATE)
Endpoint: POST /api
Description: Adds a new user to the database.


7. Add a new user by name (CREATE)
Endpoint: POST /api/:params
Description: Adds a new user to the database with the provided name. The parameter :params should be the user's name.


9. Update a user (UPDATE)
Endpoint: PUT /api/:identifier
Description: Updates a user's information based on either their ID or name. The parameter :identifier should be either a valid user ID or name.


11. Delete a user (DELETE)
Endpoint: DELETE /api/:identifier
Description: Deletes a user from the database based on either their ID or name. The parameter :identifier should be either a valid user ID or name.


##  Request and Response Formats

Fetch all users (READ)

Request: No request body needed.
Response: JSON array of user objects.


Fetch user by ID or name (READ)
Request: No request body needed.
Response: JSON object representing the user or a 404 error if not found.


Add a new user (CREATE)
Request: JSON object with a name property.
Response: JSON object representing the newly created user or a 500 error in case of an error.


Add a new user by name (CREATE)
Request: No request body needed.
Response: JSON object representing the newly created user or a 500 error in case of an error.


Update a user (UPDATE)
Request: JSON object with a name property.
Response: JSON object representing the updated user or a 500 error in case of an error.


Delete a user (DELETE)
Request: No request body needed.
Response: No content (204) on success or a 500 error in case of an error.


##   Sample Usage

## Fetch all users
Request:

http:
GET /api


Response:

json:
[
  {
    "id": 1,
    "name": "John"
  },
  {
    "id": 2,
    "name": "Jane
  
  }
]


Fetch user by ID or name

Request:

http:
GET /api/1

Response:

json:
{
  "id": 1,
  "name": "John"
}

Request:

http:
GET /api/Jane


Response:

json:
{
  "id": 2,
  "name": "Jane"
}
Add a new user
Request:

http:
POST /api
Content-Type: application/json

{
  "name": "Alice"
}
Response:

json
{
  "id": 3,
  "name": "Alice"
}


Update a user
Request:

http:
PUT /api/2
Content-Type: application/json

{
  "name": "Janet"
}


Response:

json
Copy code
{
  "id": 2,
  "name": "Janet"
}
Delete a user
Request:

http:
DELETE /api/3

Response:
No content (204)

##    Known Limitations

This API assumes that the database table is named 'users' and follows a specific schema.
Error handling is basic and may not provide detailed error messages to clients.


##    Setup and Deployment
To set up and deploy this API locally or on a server, follow these steps:

1. Clone the repository containing this code.
2. Create a .env file in the project root and set the SUPABASE_URL and SUPABASE_KEY environment variables.
3. Install the required dependencies using npm install.
4. Start the API server using npm start.


The API will be available at http://localhost:3000 (or the port specified in your .env file).
