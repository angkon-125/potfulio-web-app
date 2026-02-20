const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security Middleware
app.use(helmet()); // Set security headers
app.use(cors()); // Enable CORS
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP param pollution

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use('/api', limiter);

// Set static folder for uploads
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const projects = require('./routes/projects');
const contact = require('./routes/contact');
const admin = require('./routes/admin');

app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/projects', projects);
app.use('/api/contact', contact);
app.use('/api/admin', admin);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Portfolio API' });
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
