# Project Management Tool

## Overview
This is a full-stack Project Management Tool built with React.js (frontend) and Node.js + Express + MongoDB (backend).  
It provides user authentication, project management, and task tracking features.

---

## Features

### Authentication
- Register/Login with email & password  
- JWT-based authentication  
- Passwords are hashed using bcrypt  

### Projects
- Create, update, delete projects  
- View list of user’s projects  
- Project fields: title, description, status (active/completed)  

### Tasks
- Linked to a project  
- Fields: title, description, status (todo, in-progress, done), due date  
- CRUD operations  
- Filter by status  

### Seed Data
- 1 Test user (email: test@example.com / password: Test@123)  
- 2 Projects for this user  
- 3 Tasks per project  

---

## Tech Stack

### Frontend
- React.js (JavaScript)  
- React Router DOM  
- Axios  
- Bootstrap + CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (authentication)  
- bcrypt (password hashing)  

---

## Installation

### Backend Setup
- Navigate to backend folder
 -  cd backend
 -  npm install
 -  Create .env file and set :DB_URL=mongodb://127.0.0.1:27017/project_management
 -   npm run seed
  -  npm start
### Backend Setup
-Navigate to backend folder
 -  cd frontend
 -  npm install
  - npm start


   
