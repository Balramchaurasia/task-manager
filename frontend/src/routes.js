import React  from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';

import LoginRegister from './components/login.js';
import Dashboard from './components/dashboard.js';
import CreateNewProject from './components/addProject.js';
import CreateTask from './components/addTask.js';

function Router() {
    
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="*" element={<LoginRegister />} />
        <Route path="/add-project" element={<CreateNewProject/>}/>
        <Route path="/edit-project/:id" element={<CreateNewProject/>}/>
        <Route path='/add-task/:id' element={<CreateTask/>}/>
        <Route path='/update-task/:id' element={<CreateTask/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
