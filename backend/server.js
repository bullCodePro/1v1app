const express = require('express');
const cors = require('cors'); // Import the CORS package
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating tokens
const pool = require('./config/dbConfig'); // Import the database pool for querying

const app = express();
const port = 5000;
const appUrl = "1v1app.up.railway.app";
// Secret key for JWT (store securely, e.g., in environment variables)
const JWT_SECRET = 'your_secret_key_here';

// Enable CORS for all origins
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON data

// Sign-Up Endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    // Check if the email or username is already in use
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database with the hashed password
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User signed up successfully!',
      user: { username: newUser.rows[0].username, email: newUser.rows[0].email },
    });
  } catch (err) {
    console.error('Error during sign-up:', err);
    res.status(500).json({ message: 'Error signing up user', error: err.message });
  }
});

// Login Endpoint (Username and Password Only)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide both username and password.' });
  }

  try {
    // Fetch the user by username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${appUrl}:${port}`);
});
