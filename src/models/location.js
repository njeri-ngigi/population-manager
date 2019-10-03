const { MongoClient } = require('mongodb');
const { DATABASE_URL } = require('../environment');


const findOne = async (location) => {
  let client;
  try {
    client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();

    return db.collection('locations').findOne({ location });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  } finally {
    if (client) await client.close();
  }
};

const insertOne = async (data) => {
  let client;
  try {
    client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();

    await db.collection('locations').insertOne({ ...data });

    return 'Location added successfully';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  } finally {
    if (client) await client.close();
  }
};

const insertMany = async (data) => {
  let client;
  try {
    client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();

    await db.collection('locations').insertMany(data);

    return 'Locations added successfully';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  } finally {
    if (client) await client.close();
  }
};

const findAll = async () => {
  let client;
  try {
    client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();

    return db.collection('locations').find({}).toArray();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  } finally {
    if (client) await client.close();
  }
};

const updateLocation = async (location, data) => {
  let client;
  try {
    client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();

    return db.collection('locations')
      .findOneAndUpdate(
        { location },
        { $set: data },
        { returnOriginal: false },
        { returnNewDocument: true },
      );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  } finally {
    if (client) await client.close();
  }
};

const deleteLocation = async (location) => {
  let client;
  try {
    client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();

    db.collection('locations').deleteOne({ location });
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  } finally {
    if (client) await client.close();
  }
};

module.exports = {
  insertOne, insertMany, findOne, findAll, updateLocation, deleteLocation,
};
