import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(response.data);
        setLoading(false);

        // Initialize DataTable after fetching data
        $(document).ready(function () {
          $('#usersTable').DataTable();
        });
      } catch (err) {
        setError('Error fetching users. Please try again.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px', color: '#007bff' }}>Loading users...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', padding: '20px', fontSize: '18px' }}>{error}</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>User Listings</h2>
      <table
        id="usersTable"
        className="table table-striped table-bordered"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No users available.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
