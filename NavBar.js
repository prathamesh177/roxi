import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isAdmin, isLoggedIn, handleLogout }) => {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
    }}>
      <ul style={{
        display: 'flex',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      }}>
        {!isLoggedIn && (
          <>
            <li style={{ margin: '0 15px' }}>
              <Link to="/login" style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
              }}>Login</Link>
            </li>
            <li style={{ margin: '0 15px' }}>
              <Link to="/signup" style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
              }}>Signup</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            {isAdmin ? (
              <>
                <li style={{ margin: '0 15px' }}>
                  <Link to="/add-store" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}>Add Store</Link>
                </li>
                <li style={{ margin: '0 15px' }}>
                  <Link to="/add-user" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}>Add User</Link>
                </li>
                <li style={{ margin: '0 15px' }}>
                  <Link to="/admin-dashboard" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}>Dashboard</Link>
                </li>
                <li style={{ margin: '0 15px' }}>
                  <Link to="/stores" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}>View Stores</Link>
                </li>
                <li style={{ margin: '0 15px' }}>
                  <Link to="/users" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}>View Users</Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ margin: '0 15px' }}>
                  <Link to="/stores" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}>View Stores</Link>
                </li>
              </>
            )}
            <li style={{ margin: '0 15px' }}>
              <Link to="/change-password" style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
              }}>Change Password</Link>
            </li>
            <li style={{ margin: '0 15px' }}>
              <button onClick={handleLogout} style={{
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
