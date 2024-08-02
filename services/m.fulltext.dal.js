const { ObjectId } = require("mongodb");
const dal = require("./m.db");

async function createTextIndex() {
  try {
    await dal.connect();
    const database = dal.db("mongodb");
    const collection = database.collection("games");
    await collection.createIndex({ "$**": "text" });
    console.log("Text index created on all fields");
  } catch (err) {
    console.error('Error occurred while creating text index:', err);
    throw err;
  } finally {
    dal.close();
  }
}

async function getFullText(fulltext) {
  if (DEBUG) console.log("mongo.dal.getFullText()");
  try {
    await dal.connect();
    const database = dal.db("mongodb");
    const collection = database.collection("games");
    const result = await collection.find({ $text: { $search: fulltext } }).toArray();
    return result;
  } catch (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
    throw err;
  } finally {
    dal.close();
  }
};

module.exports = {
  getFullText,
  createTextIndex,
};