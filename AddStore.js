import React, { useState } from 'react';
import axios from 'axios';

const AddStore = () => {
  const [storeData, setStoreData] = useState({ name: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/addstore', storeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Store added successfully');
    } catch (error) {
      console.error('Error adding store:', error);
      alert('Failed to add store');
    }
  };

  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '20px' }}>Add Store</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          onChange={handleChange}
          required
          style={{ width: '300px', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
          style={{ width: '300px', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button
          type="submit"
          style={{
            width: '300px',
            padding: '10px',
            margin: '20px 0',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AddStore;
