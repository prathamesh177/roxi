



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5'; // Import DataTables for Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(null);
  const tableRef = useRef();

  // Fetch stores when the component mounts
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stores', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStores(response.data);
        setLoading(false);

        // Initialize DataTable after data is set
        if ($.fn.dataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }
        $(tableRef.current).DataTable();
      } catch (err) {
        setError('Error fetching stores. Please try again.');
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = async (storeId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setRatingError('StoreOwner Dont Have Access To Modify This.');
        return;
      }

      await axios.post(
        `http://localhost:5000/api/stores/${storeId}/rate`,
        { userId, rating },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // Refresh the store list after updating the rating
      const response = await axios.get('http://localhost:5000/api/stores', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStores(response.data);
      setRating(0);
      setSelectedStoreId(null);

      // Reinitialize the DataTable with the new data
      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable();
    } catch (err) {
      setRatingError('Error submitting rating. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading stores...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Store Listings</h2>

      {/* Table using Bootstrap and DataTables */}
      <table ref={tableRef} className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Average Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.length === 0 ? (
            <tr>
              <td colSpan="5">No stores available.</td>
            </tr>
          ) : (
            stores.map((store) => (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                  {store.averageRating !== undefined
                    ? store.averageRating.toFixed(2)
                    : 'No ratings yet'}
                </td>
                <td>
                  {store.ratings && store.ratings.length > 0 ? (
                    store.ratings.find(
                      (r) => r.userId === localStorage.getItem('userId')
                    )?.rating || 'N/A'
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  {selectedStoreId === store._id ? (
                    <div>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={handleRatingChange}
                      />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleRatingSubmit(store._id)}
                      >
                        Submit Rating
                      </button>
                      {ratingError && <div>{ratingError}</div>}
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedStoreId(store._id)}
                    >
                      Rate this store
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
