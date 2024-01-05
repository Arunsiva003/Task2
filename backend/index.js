const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "b5jp95kgcuf2cbvjobok-mysql.services.clever-cloud.com",
    user:  "u1jkxmf7bmdsen5r",
    password: "wVBATFbynpeBCiqBaFLV",
    database:  "b5jp95kgcuf2cbvjobok"
  });
  

db.connect((err) => {
  if (err) {
    console.log('MySQL connection failed: ', err);
  } else {
    console.log('Connected to MySQL database');
  }
});




//flight functions 
app.post('/search-flights', (req, res) => {
    const { date, place } = req.body;
    console.log("hello")
    // Query the database for available flights
    const query = 'SELECT * FROM flights WHERE date = ? AND place = ?';
    db.query(query, [date, place], (err, result) => {
      if (err) {
        res.status(500).send('Error querying database');
      } else {
        res.status(200).json(result);
        console.log("backend res;",result)
      }
    });
  });
  
  app.get('/my-bookings/:username', (req, res) => {
    const username = req.params.username;
  
    // Query the database to get the user's bookings
    const query = 'SELECT * FROM bookings WHERE username = ?';
    db.query(query, [username], (err, result) => {
      if (err) {
        res.status(500).send('Error fetching bookings');
      } else {
        res.status(200).json(result);
      }
    });
  });
  


  // Flight booking route
  app.post('/book-flight', (req, res) => {
    const { username, flightId } = req.body;
    console.log("booking flight details:",username, flightId)
    // Insert booking into the database
    const query = 'INSERT INTO bookings (username, flight_id) VALUES (?, ?)';
    const query2 = 'update flights set seatsCount = seatsCount-1 where flight_id=?';
    db.query(query, [username, flightId], (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error booking flight');
      } else {
        res.status(200).send('Flight booked successfully');
      }
    //   console.log(result);
    });

    db.query(query2,[flightId]);
  });

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database for the user
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Error querying database');
    } else {
      if (result.length > 0) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    }
  });
});

app.post("/register",(req,res)=>{
  const {username,password}=req.body;
  const q = 'insert into users values(?,?)';
  db.query(q,[username,password],(err)=>{
    if(err) console.log(err);
    console.log("user added");
  })
});




//admin functions
app.post("/newflights",(req,res)=>{
  const {date,place,seatsCount} = req.body;
  const q = 'insert into flights(date, place, seatsCount) values (?,?,?)';
  db.query(q,[date,place,seatsCount],(err)=>{
    if(err) console.log(err);
    console.log("flight added");
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
