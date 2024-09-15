import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddStore from './components/AddStore';
import AddUser from './components/AddUser';
import AdminDashboard from './components/AdminDashboard';
import StoreList from './components/StoreList';

import ChangePassword from './components/ChangePassword';



import '/node_modules/bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'; // For DataTables Bootstrap integration
import $ from 'jquery';
import 'datatables.net-bs5'; // DataTables with Bootstrap 5
import UserList from './components/Userlist';



const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Retrieve role from localStorage

    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(role === 'admin'); // Check if the user is an admin
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role from localStorage
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <NavBar isAdmin={isAdmin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<Signup />} />
        
        {isLoggedIn && isAdmin && (
          <>
            <Route path="/add-store" element={<AddStore />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/stores" element={<StoreList />} />
        
          </>
        )}
        {isLoggedIn && (
          <>
          <Route path="/stores" element={<StoreList />} />
          <Route path="/change-password" element={<ChangePassword />} />
          </>
          
          
        )}
      </Routes>
    </Router>
  );
};

export default App;
