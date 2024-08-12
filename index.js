// index.js

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
global.DEBUG = true;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
const myEventEmitter = require('./services/logEvents.js');

// Start the server and log the event
app.listen(PORT, (err) => {
    if (err) console.log(err);
    myEventEmitter.emit('event', 'app.listen', 'SUCCESS', 'HTTP search site successfully started.');
    console.log(`Simple app running on port ${PORT}.`);
});

// Define main routes
app.get('/', async (req, res) => {
    myEventEmitter.emit('event', 'app.get', 'INFO', 'Landing page (index.ejs) was displayed.');
    res.render('index', { status: req.session.status });
});

app.get('/about', async (req, res) => {
    myEventEmitter.emit('event', 'app.get /about', 'INFO', 'About page (about.ejs) was displayed.');
    res.render('about', { status: req.session.status });
});

// Import and use route files
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const apiAuthRoutes = require('./routes/api/auth');
const apiFulltextRoutes = require('./routes/api/fulltext');
const apiIndexRoutes = require('./routes/api/index');

app.use('/auth', authRoutes);
app.use('/search', searchRoutes);
app.use('/api/auth', apiAuthRoutes);
app.use('/api/fulltext', apiFulltextRoutes);
app.use('/api', apiIndexRoutes);

module.exports = app;