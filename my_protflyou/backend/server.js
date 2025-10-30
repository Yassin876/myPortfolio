const fs = require('fs');
console.log('ENV exists?', fs.existsSync('./.env'));
require('dotenv').config();
console.log('Loaded environment variables:', process.env); // Debug: Print all loaded env vars
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema for Project
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  githubLink: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['NLP', 'ML', 'Data Analysis', 'DL', 'Other'],
    required: true
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  // You need to use App Password for Gmail
  }
});
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");


// Middleware to check if user is admin (for demonstration, using a simple check)
const isAdmin = (req, res, next) => {
  // In production, use proper authentication (JWT, sessions, etc.)
  const adminToken = req.headers.authorization;
  const correctToken = process.env.ADMIN_TOKEN;
  // For now, we'll use a simple check (you should implement proper authentication)
  if (adminToken === correctToken) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};

// Routes
// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get projects by type
app.get('/api/projects/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const projects = await Project.find({ type }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new project (admin only)
app.post('/api/projects', isAdmin, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a project (admin only)
app.delete('/api/projects/:id', isAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send contact email
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER ,
      to: 'yassinahmed6109@gmail.com', // Your email where you want to receive messages
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from your portfolio website</em></p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
