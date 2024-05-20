const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Dummy user data (replace this with your actual user data from a database)
let users = [];

// Registration endpoint
app.post('/api/registration', (req, res) => {
  const { username, password, email, firstName, lastName, gender } = req.body;
  
  // Check if username is already taken
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Add the new user to the users array
  const newUser = { username, password, email, firstName, lastName, gender };
  users.push(newUser);

  res.status(200).json({ message: 'User registered successfully', user: newUser });
});

const jwt = require('jsonwebtoken');

// Секретный ключ для подписи токена (замените его на случайную строку с достаточной длиной)
const JWT_SECRET = 'HjhjGYTucsugu798gGHgyg';

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username and password
  const user = users.find(user => user.username === username && user.password === password);

  // Check if user exists and password is correct
  if (user) {
    // Generate JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    // Return the token and user data
    res.status(200).json({ message: 'Login successful', token, user });
  } else {
    // If login failed, return error message
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
