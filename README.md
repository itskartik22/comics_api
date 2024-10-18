# Comic Book Store Inventory Management System

This is a simple backend application for managing a comic book store's inventory. The application provides CRUD operations for comic books and includes user authentication for manager access. The backend is built using Node.js, Express, and MongoDB.

## Features

- **CRUD Operations**: Managers can create, update, read, and delete comic book entries in the inventory.
- **Manager Authentication**: Only authenticated managers can access and manage the inventory using a login system.
- **Pagination and Query Features**: Comic book listings are paginated, and users can query the inventory.
- **Cookie-Based Session**: Authentication tokens are stored in cookies for session management.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version 14.x or higher)
- MongoDB
- Git (optional, if cloning the repository)

## Environment Variables

Create a `config.env` file in the root directory of your project and add the following values:

```bash
NODE_ENV=development
PORT=8000
MONGO_DB_URI=<your-mongodb-connection-string>
MONGO_DB_NAME=<your-database-name>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=<token-expiration-time> # example: 7d for 7 days
ACCOUNT_ACCESS_PASS=<secret-pass-for-manager-creation>
```

There is a file in the root directory name "config.example.env". You can rename it to "config.env"

## Project Setup

### 1. Clone the repository

Start by cloning the project repository to your local machine:

```bash
git clone https://github.com/itskartik22/comics_api
cd comics-api
```

### 2. Install dependencies

After cloning the repository, install the necessary Node.js packages by running:

```bash
npm install
```

### 3. Set up environment variables

Create a config.env file in the root directory of the project by copying the example configuration file:

```bash
cp config.example.env config.env
```

Open the .env file and fill in the following environment variables:

- NODE_ENV: The environment in which the app is running (development or production).
- PORT: The port number where your backend will run (default: 5000).
- MONGO_DB_URI: Your MongoDB connection string (for local or - cloud MongoDB instances).
- MONGO_DB_NAME: The name of your database in MongoDB.
- JWT_SECRET: Secret key used to sign the JWT tokens.
- JWT_EXPIRE: Token expiration time (e.g., 1d, 10h).
- ACCOUNT_ACCESS_PASS: Access pass for creating the first manager account.

Example of config.env:

```bash
NODE_ENV=development
PORT=8000
MONGO_DB_URI=mongodb://localhost:27017/comic-store
MONGO_DB_NAME=comics
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=1d
ACCOUNT_ACCESS_PASS=super_secret_pass
```

### 4. Run Server

Once you’ve set the environment variables, run the server using:

```bash
npm start // for production
npm run dev // for local run
```

## Comic Book CRUD Operations

Once logged in as a manager, you can manage comic books using the following API routes:

- **Craete Manager Account**: POST /api/comics/manager/create
- **Login**: POST /api/comics/manager/login
- **Logout**: POST /api/comics/manager/logout
- **List Comic Books**: GET /api/comics?page=1&limit=10
- **Get Comic Book by ID**: GET /api/comics/:id
- **Create a New Comic**: POST /api/comics
- **Update Comic Information**: PATCH/api//comics/:id
- **Delete a Comic**: DELETE /api/comics/:id

## Using Postman for Testing

All the routes and input fields are set in the Postman collection provided with this project. Import the Postman collection into Postman to test the functionality easily.

- **To Import the Collection**
  1. Open Postman.
  2. Click on the Import button.
  3. Select File and upload the Postman collection JSON file `Comic Books.postman_collection.json` included in this repository.
  4. Once imported, you will have all the necessary requests configured to interact with the API.

# Thank you
