import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const appUrl = "1v1app.up.railway.app";
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setMessage('Please fill in all fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Hash the password
        const salt = bcrypt.genSaltSync(10); // Generate a salt
        const hashedPassword = bcrypt.hashSync(formData.password, salt);

        // Send POST request to backend with the hashed password
        const response = await axios.post(`${appUrl}:5000/api/signup`, {
          username: formData.username,
          email: formData.email,
          password: hashedPassword, // Send the hashed password
        });

        setMessage('User signed up successfully!');
        setFormData({
          username: '',
          email: '',
          password: ''
        });

        console.log(response.data);
      } catch (error) {
        console.error('Error during sign-up:', error);
        setMessage('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div className="sign-up-main-content">
      <div className="sign-up-container">
        <h2>Sign Up Jopi</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>

        {message && <p>{message}</p>}

        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </div>
  );
}

export default SignUp;
