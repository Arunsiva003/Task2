import React, { useState } from 'react';
import axios from 'axios';

const FlightBooking = () => {
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSearch = async () => {
    try {
        console.log("searching....")
      const response = await axios.post('http://localhost:3001/search-flights', {
        date:date,
        place:place,
      });
      setFlights(response.data);
      console.log(flights);
    } catch (error) {
      console.error('Error searching flights:', error.response.data);
    }
  };

  const handleBook = async () => {
    try {
        console.log("booking...");
      const response = await axios.post('http://localhost:3001/book-flight', {
        username: 'arun', // Replace with actual user ID
        flightId: selectedFlight.flight_id,
      }).then(()=>alert("Ticket booked Successfully!"));
      // console.log(response.data);
    } catch (error) {
      console.log(error)
      console.error('Error booking flight:', error.response?.data);
    }
  };
  return (
    <div className="container">
      <h2>Flight Booking</h2>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Place:</label>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
      </div>
      <button type="button" onClick={handleSearch}>
        Search Flights
      </button>

      <div>
        <h3>Available Flights</h3>
        <ul>
          {flights.map((flight) => (
            <li key={flight.id}>
              {flight.flight_id}-{flight.name} - {flight.date} - {flight.place}
              <button type="button" onClick={() => setSelectedFlight(flight)}>
                select
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedFlight && (
        <div className="selected-flight">
          <h3>Selected Flight</h3>
          <p>{selectedFlight.name} - {selectedFlight.date} - {selectedFlight.place}</p>
          <button type="button" onClick={handleBook}>
            Book Flight
          </button>
        </div>
      )}
    </div>
  );
};
export default FlightBooking;
