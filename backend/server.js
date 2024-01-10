const express = require('express');
const mongoose = require('./db')
const cors = require('cors');
const app = express();
const User = require('./UserSchema')
const PORT = process.env.PORT || 4001;
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');
// ... (previous code)

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.json({ success: false, message: 'Username is already taken' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
  
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.json({ success: false, message: 'Invalid credentials' });
      }
  
      // Compare hashed passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json({ success: true, user });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  app.get('/api/users', async (req, res) => {
    try {
      // Fetch user data from MongoDB, excluding the password field
      const users = await User.find().select({ username: 1, _id: 0 }); // Excludes _id field as well
      res.json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
