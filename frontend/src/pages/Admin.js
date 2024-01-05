import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [flightInfo, setFlightInfo] = useState({
    date:"",
    time: "",
    place: "",
    seatsCount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      // Combine date and time into a single datetime string
      const datetime = `${flightInfo.date}T${flightInfo.time}`;
      const response = await axios.post("http://localhost:3001/newflights", {
        ...flightInfo,
        datetime,
      });
      console.log("Flight added successfully:", response.data);
      // You can perform additional actions or reset the form if needed
    } catch (error) {
      console.error("Error adding flight:", error.response.data);
    }
  };

  // Function to get tomorrow's date in the required format (YYYY-MM-DD)
  function getTomorrowFormattedDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
    const day = tomorrow.getDate().toString().padStart(2, "0");
    return `${tomorrow.getFullYear()}-${month}-${day}`;
  }

  // Function to get the current time in the required format (HH:mm)
  function getCurrentTime() {
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <>
      <h2>Add New Flight</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={flightInfo.date}
          onChange={handleChange}
          min={getTomorrowFormattedDate()} // Set the minimum date to tomorrow
          required
        />

        {/* <label>Time:</label>
        <input
          type="time"
          name="time"
          value={flightInfo.time}
          onChange={handleChange}
          min={getCurrentTime()} // Set the minimum time to the current time
          required
        /> */}

        <label>Place:</label>
        <input type="text" name="place" value={flightInfo.place} onChange={handleChange} required />

        <label>Seats Count:</label>
        <input type="number" name="seatsCount" value={flightInfo.seatsCount} onChange={handleChange} required />

        <button type="submit">Add Flight</button>
      </form>
    </>
  );
};

export default Admin;
