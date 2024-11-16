DSA Web Project
This repository contains two main projects:

dsa-sheet-app: A React.js application for the frontend.
dsa-web: A Node.js + TypeScript application for the backend using Sequelize and MySQL.
Prerequisites
Node.js (version >= 14.x)
npm (version >= 6.x)
MySQL (installed and running)
Project Structure
plaintext
Copy code
dsa-web/
  ├── dsa-sheet-app/       # React frontend app
  ├── dsa-web/             # Node.js + TypeScript backend app
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone [https://github.com/username/dsa-web.git](https://github.com/harshal2451/dsa-sheet-application.git)
Replace username with your GitHub username.

2. Navigate to the Project Directory
bash
Copy code
cd dsa-web
3. Set Up the Backend (Node.js + TypeScript)
Navigate to the backend directory:

bash
Copy code
cd dsa-web
Install dependencies:

bash
Copy code
npm install
Configure the .env file in the dsa-web directory:

Create a .env file with the following content:
env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
DB_PORT=3306
JWT_SECRET=your_jwt_secret
Replace yourpassword, yourdatabase, and your_jwt_secret with your MySQL and JWT details.
Run database migrations:

bash
Copy code
npx sequelize-cli db:migrate
Start the backend server:

bash
Copy code
npm run start_ts
The backend server should now be running at http://localhost:3000.

4. Set Up the Frontend (React.js)
Navigate to the frontend directory:
bash
Copy code
cd ../dsa-sheet-app
Install dependencies:
bash
Copy code
npm install
Start the frontend development server:
bash
Copy code
npm start
The frontend app should now be running at http://localhost:3001.

Running Both Projects
Backend: Ensure your MySQL server is running, then start the backend server as described in step 3.
Frontend: In a separate terminal, start the frontend server as described in step 4.
Environment Variables
Ensure the .env file in the dsa-web directory is correctly configured with your MySQL and JWT details.
Project Scripts
Backend (dsa-web)
Start the server: npm run start_ts
Run database migrations: npx sequelize-cli db:migrate
Frontend (dsa-sheet-app)
Start the React app: npm start
Build the app for production: npm run build
Run tests: npm test
Notes
Make sure both your frontend and backend servers are running on different ports (3000 for backend and 3001 for frontend).
You can adjust the frontend's API calls to point to http://localhost:3000 for backend interactions.
