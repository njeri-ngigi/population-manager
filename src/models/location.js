const { MongoClient } = require('mongodb');
const { DATABASE_URL } = require('../environment');

module.exports = {
  async insertOne(data) {
    let client;
    try {
      let message;
      const { location, ...details } = data;

      client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db();
      const { modifiedCount, matchedCount } = await db.collection('locations').updateOne(
        { location }, { $set: details }, { upsert: true },
      );

      switch (1) {
        case (modifiedCount):
          message = 'Location updated successfully';
          break;

        case (matchedCount):
          message = 'Location already exists. Nothing changed';
          break;

        default:
          message = 'Location added successfully';
      }

      return message;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      if (client) await client.close();
    }
  },
};
