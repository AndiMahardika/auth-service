# Auth Service

This project is an authentication service that handles user authentication using JWT (JSON Web Tokens) and MongoDB. It provides functionality for logging in, registering, and generating JWT tokens for access and refresh.

## Features

- User registration
- User login
- JWT access and refresh tokens
- Token expiration handling
- MongoDB as the database for storing user information

## Prerequisites

Before running this project, make sure you have:

- Node.js installed on your system.
- MongoDB database (you can use MongoDB Atlas or a local instance).

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/AndiMahardika/auth-service.git
   cd auth-service
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGO_URI=mongodb+srv://<your_mongodb_connection_string>
   PORT=3000
   JWT_ACCESS_SECRET_KEY=<your_jwt_access_secret_key>
   JWT_REFRESH_SECRET_KEY=<your_jwt_refresh_secret_key>
   JWT_ACCESS_EXPIRATION=120s
   JWT_REFRESH_EXPIRATION=7d
   ```

   - Replace `<your_mongodb_connection_string>` with your MongoDB URI.
   - Replace `<your_jwt_access_secret_key>` and `<your_jwt_refresh_secret_key>` with your JWT secret keys.

4. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.