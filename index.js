// index.js

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// const { Client } = require('pg');
// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
// const client = new Client({
//   connectionString: connectionString,
// });

// async function testDatabaseConnection() {
//   try {
//     await client.connect();
//     console.log("Successfully connected to the PostgreSQL database.");

//     const res = await client.query('SELECT * FROM games');
//     console.log("Rows in the table:", res.rows);
//   } catch (err) {
//     console.error("Failed to connect to the PostgreSQL database.", err);
//   } finally {
//     await client.end();
//   }
// }

// testDatabaseConnection();



// const { MongoClient } = require('mongodb');

// async function testDatabaseConnection2() {
//     const connectionString = process.env.MDBLOCAL;
//     if (!connectionString) {
//         console.error("MongoDB connection string is not defined. Please set the MDBLOCAL environment variable.");
//         return;
//     }

//     const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         await client.connect();
//         console.log("Successfully connected to the MongoDB database.");

//         const dbName = 'mongodb'; // Replace with your actual database name if needed
//         const db = client.db(dbName); // Use the specified database name
//         const collectionName = 'games'; // Ensure this is the correct collection name
//         const collection = db.collection(collectionName);

//         console.log(`Accessing database: ${dbName}`);
//         console.log(`Accessing collection: ${collectionName}`);

//         const documents = await collection.find({}).toArray();
//         console.log("Documents in the collection:", documents);
//     } catch (err) {
//         console.error("Failed to connect to the MongoDB database.", err);
//     } finally {
//         await client.close();
//     }
// }

// // Call the function to test the database connection and display contents
// testDatabaseConnection2();

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

// const connectionString = process.env.MDBLOCAL;
// if (!connectionString) {
//     console.error("MongoDB connection string is not defined. Please set the MDBLOCAL environment variable.");
//     process.exit(1);
// }

// if (!connectionString.startsWith('mongodb://')) {
//     console.error("Invalid MongoDB connection string. It should start with 'mongodb://'.");
//     process.exit(1);
// }

app.listen(PORT, (err) => {
    if (err) console.log(err);
    myEventEmitter.emit('event', 'app.listen', 'SUCCESS', 'http search site successfully started.');
    console.log(`Simple app running on port ${PORT}.`);
});

// Define main routes
app.get('/', async (req, res) => {
    myEventEmitter.emit('event', 'app.get', 'INFO', 'landing page (index.ejs) was displayed.');
    res.render('index', { status: req.session.status });
});

app.get('/about', async (req, res) => {
    myEventEmitter.emit('event', 'app.get /about', 'INFO', 'about page (about.ejs) was displayed.');
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
app.use('/api/auth', apiAuthRoutes);-
app.use('/api/fulltext', apiFulltextRoutes);
app.use('/api', apiIndexRoutes);

module.exports = app;
