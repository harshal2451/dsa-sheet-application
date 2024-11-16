# DSA Web Application

This repository contains two main parts:

1. **DSA Sheet App** - A React application for displaying and managing DSA problems.
2. **Dsa Web** - A Node.js + TypeScript backend server for handling API requests and user authentication.

## Prerequisites

Before running both the projects, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

## Project Structure

```
dsa-sheet-application/
  ├── dsa-sheet-app/        # React application for the DSA sheet
  └── dsa-web/               # Node.js + TypeScript backend server
```

### Running the Projects

#### 1. Running the React App (`dsa-sheet-app`)

To run the React app, follow these steps:

1. Navigate to the `dsa-sheet-app` directory:
   ```bash
   cd dsa-sheet-application/dsa-sheet-app
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   This will run the React app on [http://localhost:3000](http://localhost:3000).

#### 2. Running the Node.js + TypeScript Backend (`dsa-web`)

To run the backend, follow these steps:

1. Navigate to the `dsa-web` directory:
   ```bash
   cd dsa-sheet-application/dsa-web
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run start_ts
   ```

   This will start the backend server using TypeScript. The server will be accessible at [http://localhost:3001](http://localhost:3001) (or a different port if configured differently).

### Environment Variables

For the backend, create a `.env` file in the `dsa-sheet-application/dsa-web` directory with the necessary environment variables. Here are the typical variables you may need:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=dsa_db
JWT_SECRET=your-jwt-secret
```

Adjust the values accordingly based on your setup.

### Folder Structure

#### `dsa-sheet-app` (React App)

- `src/` - Contains React components, Redux slices, and other frontend code.
- `public/` - Contains static assets (e.g., images, icons).
- `package.json` - Lists dependencies and scripts for running the app.

#### `dsa-web` (Node.js + TypeScript Backend)

- `src/` - Contains backend code, including models, controllers, and routes.
- `index.ts` - The entry point for the backend application.
- `package.json` - Lists dependencies and scripts for running the back
