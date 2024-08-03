const { MongoClient, ObjectId } = require("mongodb");

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  if (!client.topology || !client.topology.isConnected()) {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    }
  }
  return client.db(process.env.MONGO_DATABASE);
}

async function ensureTextIndex() {
  try {
    const database = await connect();
    const collection = database.collection("games");
    const indexes = await collection.indexes();
    const textIndexExists = indexes.some(index => index.key && index.key._fts === "text");

    if (!textIndexExists) {
      await collection.createIndex({ "$**": "text" });
      console.log("Text index created on all fields");
    } else {
      console.log("Text index already exists");
    }
  } catch (err) {
    console.error('Error occurred while ensuring text index:', err);
    throw err;
  }
}

async function getFullText(searchTerm) {
  try {
    await ensureTextIndex();
    const database = await connect();
    const collection = database.collection("games");
    const result = await collection.find({ $text: { $search: searchTerm } }).toArray();
    console.log("Full text search result:", result);
    return result;
  } catch (err) {
    console.error('Error occurred while performing full text search:', err);
    throw err;
  }
}

module.exports = {
  getFullText,
  ensureTextIndex,
};