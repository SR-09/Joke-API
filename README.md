# JokeAPI

JokeAPI is a public API designed to deliver joy to users by providing access to a collection of humorous jokes. This API allows users to retrieve random jokes, search for specific jokes by ID, filter jokes by type, create new jokes, update existing jokes, and delete jokes. The API is built using Node.js with Express.js for handling HTTP requests and PostgreSQL as the database.

## Base URL

All endpoints are relative to the base URL: `http://localhost:3000/`

## Endpoints

1. **GET Random Joke**
   - **Description:** Retrieve a random joke from the JokeAPI.
   - **Endpoint:** `/random/`

2. **GET Specific Joke**
   - **Description:** Retrieve a specific joke by providing its ID.
   - **Endpoint:** `/jokes/:id`

3. **GET Filtered Joke By Type**
   - **Description:** Filter jokes by their type.
   - **Endpoint:** `/filter?type=<joke_type>`

4. **POST New Joke**
   - **Description:** Create a new joke.
   - **Endpoint:** `/jokes`

5. **PUT Replace Joke**
   - **Description:** Replace a joke with new content.
   - **Endpoint:** `/jokes/:id`

6. **PATCH Edit Joke**
   - **Description:** Edit a joke by providing its ID and optional new content.
   - **Endpoint:** `/jokes/:id`

7. **DELETE A Joke**
   - **Description:** Delete a joke by providing its ID.
   - **Endpoint:** `/jokes/:id`

8. **DELETE All Jokes**
   - **Description:** Delete all jokes from the API. Requires authentication.
   - **Endpoint:** `/jokes/all`
   - **Authentication:** Requires an API key to perform this action.

## Database Setup

Before running the application, set up your PostgreSQL database with the following schema:

```sql
CREATE TABLE jokes (
  id SERIAL PRIMARY KEY,
  jokeText TEXT,
  jokeType VARCHAR(255)
);
```
## Importing Data

You can import jokes data from the provided CSV file or use your own data. After setting up the table, you can import data using SQL `COPY` command or tools like pgAdmin or psql.

## Environment Variables

Configure the following environment variables in a `.env` file in the project root directory:

```makefile
DB_USER=your_database_username
DB_HOST=your_database_host
DB_DATABASE=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=your_database_port
MASTER_KEY=your_master_key
```

## Technologies Used

- **Express.js**: Web framework for Node.js used for building the API endpoints.
- **PostgreSQL**: Relational database management system for storing and managing joke data.
- **body-parser**: Middleware for parsing incoming request bodies in Express.js.
- **dotenv**: Module for loading environment variables from a `.env` file into `process.env`.
- **Postman**: API development environment for testing and debugging API endpoints.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your PostgreSQL database and configure environment variables in a `.env` file.
4. Run the application using `npm start`.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
