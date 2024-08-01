// connect to MONDODB database on localhost 27017 with database name 'mongodb' and collection name 'games' with admin user 'steve' and password '1234' using mongo client

const MongoClient = require('mongodb');
const uri = process.env.MONGO_URI;
const pool = new MongoClient(uri)

module.exports = pool;

