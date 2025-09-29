📝 Project Management Tool
📌 Overview

This is a full-stack Project Management Tool built with React.js (frontend) and Node.js + Express + MongoDB (backend).
It provides user authentication, project management, and task tracking features.

🚀 Features
🔑 Authentication

Register/Login with email & password

JWT-based authentication

Passwords are hashed using bcrypt

📂 Projects

Create, update, delete projects

View list of user’s projects

Project fields: title, description, status (active/completed)

✅ Tasks

Linked to a project

Fields: title, description, status (todo, in-progress, done), due date

CRUD operations

Filter by status

🧑‍💻 Seed Data

1 Test user (email=test@example.com /password= Test@123)

2 Projects for this user

3 Tasks per project

🛠️ Tech Stack
Frontend

React.js (JavaScript)

React Router DOM

Axios

Bootstrap + CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (authentication)

bcrypt (password hashing)

⚙️ Installation
Backend Setup

Navigate to backend folder:

cd backend


Install dependencies:

npm install


Create .env file:

DB_URL=mongodb://127.0.0.1:27017/project_management


Run seeder to add dummy data:

npm run seed


✅ This will create:

User → test@example.com / Test@123

2 Projects

3 Tasks per project

Start backend:

npm run dev

Frontend Setup

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Start frontend:

npm start


The app will run on http://localhost:3000


📌 Scripts
Backend

npm start → Start backend server

npm run seed → Run seeder script

Frontend

npm start → Start frontend React app
