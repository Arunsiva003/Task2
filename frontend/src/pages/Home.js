// Home.js

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home = () => (
  <div className="container">
    <h2>Home Page</h2>
    <div className="links-container">
      <Link to="/bookflights" className="link">
        Book Flights
      </Link>
      <Link to="/mybookings" className="link">
        My Bookings
      </Link>
    </div>
  </div>
);

export default Home;
