const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  try {
    if (!db) {
      await client.connect();
      db = client.db("341BD"); // uses the default database from URI
      console.log('Connected to MongoDB');
    }
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
