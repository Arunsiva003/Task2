import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const username = 'arun';
      const response = await axios.get(`http://localhost:3001/my-bookings/${username}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error.response.data);
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.booking_id}>
              Flight ID: {booking.flight_id} - Booking Date: {booking.booking_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
