# JokeAPI Documentation

**Introduction**

JokeAPI is a public API designed to deliver joy to users by providing access to a collection of humorous jokes. This document outlines the endpoints available in the JokeAPI and how to use them.

## Base URL

All endpoints are relative to the base URL: http://localhost:3000/

## Endpoints

1. **GET Random Joke**
   - **Description:** Retrieve a random joke from the JokeAPI.
   - **Endpoint:** /random/
   - **Example Request:**
     ```bash
     curl --location 'http://localhost:3000/random/' 
     ```
   - **Example Response:**
     ```json
     { "id": 43, "jokeText": "What did one ocean say to the other ocean? Nothing, they just waved.", "jokeType": "Wordplay" } 
     ```

2. **GET Specific Joke**
   - **Description:** Retrieve a specific joke by providing its ID.
   - **Endpoint:** /jokes/:id
   - **Example Request:**
     ```bash
     curl --location 'http://localhost:3000/jokes/2' 
     ```
   - **Example Response:**
     ```json
     { "id": 2, "jokeText": "Why did the scarecrow win an award? Because he was outstanding in his field.", "jokeType": "Puns" } 
     ```

3. **GET Filtered Joke By Type**
   - **Description:** Filter jokes by their type.
   - **Endpoint:** /filter?type=<joke_type>
   - **Example Request:**
     ```bash
     curl --location 'http://localhost:3000/filter?type=Puns' 
     ```
   - **Example Response:**
     ```json
     [ { "id": 2, "jokeText": "Why did the scarecrow win an award? Because he was outstanding in his field.", "jokeType": "Puns" }, ... ] 
     ```

4. **POST New Joke**
   - **Description:** Create a new joke.
   - **Endpoint:** /jokes
   - **Example Request:**
     ```bash
     curl --location 'http://localhost:3000/jokes' 
     ```
   - **Example Response:**
     ```json
     { "id": 101, "jokeText": "Iamonthemoonandthereisnowheretogetabeer. Thereisnospacebar.", "jokeType": "Science" } 
     ```

5. **PUT Replace Joke**
   - **Description:** Replace a joke with new content.
   - **Endpoint:** /jokes/:id
   - **Example Request:**
     ```bash
     curl --location --request PUT 'http://localhost:3000/jokes/2' 
     ```
   - **Example Response:**
     ```json
     { "id": 2, "jokeText": "Why did the scarecrow win a prize? Because he was outstanding in his field.", "jokeType": "Science" } 
     ```

6. **PATCH Edit Joke**
   - **Description:** Edit a joke by providing its ID and optional new content.
   - **Endpoint:** /jokes/:id
   - **Example Request:**
     ```bash
     curl --location --request PATCH 'http://localhost:3000/jokes/2' 
     ```
   - **Example Response:**
     ```json
     { "id": 2, "jokeText": "Why did the scarecrow win a prize? Because he was outstanding in his field.", "jokeType": "Agriculture" } 
     ```

7. **DELETE A Joke**
   - **Description:** Delete a joke by providing its ID.
   - **Endpoint:** /jokes/:id
   - **Example Request:**
     ```bash
     curl --location --request DELETE 'http://localhost:3000/jokes/2' 
     ```
   - **Example Response:**
     ```plaintext
     OK
     ```

8. **DELETE All Jokes**
   - **Description:** Delete all jokes from the API. Requires authentication.
   - **Endpoint:** /jokes/all
   - **Authentication:** Requires an API key to perform this action.
   - **Example Request:**
     ```bash
     curl --location --request DELETE 'http://localhost:3000/all' 
     ```
   - **Example Response:**
     ```plaintext
     OK
     ```
