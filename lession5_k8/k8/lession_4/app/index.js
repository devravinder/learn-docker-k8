const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
// Middleware
app.use(bodyParser.json());


const {PORT, DB_URL} = process.env

if(!PORT || !DB_URL){
    throw new Error('PORT and DB_URL are required')
}

// Connect to MongoDB
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true
    // , unique: true 
},
  age: { type: Number, required: true },
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Routes

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/users/create', async (req, res) => {
  try {
    const user = {
      name: 'John Doe',
      email: 'zLZt2@example.com',
      age: 30
    }
    const newUser = new User(user);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
