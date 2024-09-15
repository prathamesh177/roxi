import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Dashboard data:', response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f9',
      padding: '20px',
    }}>
      <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>Admin Dashboard</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        width: '80%',
        maxWidth: '900px',
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '24px', color: '#4CAF50' }}>Total Users</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{dashboardData.totalUsers}</p>
        </div>
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '24px', color: '#2196F3' }}>Total Stores</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{dashboardData.totalStores}</p>
        </div>
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '24px', color: '#FF5722' }}>Total Ratings</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{dashboardData.totalRatings}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
