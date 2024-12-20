const mongoClient = require('mongodb').MongoClient;
const config = require('config');
const logger = require('../utils/logger');

let dbClient = null;
module.exports = function getMongoDBClient() {
  if (dbClient) {
    return dbClient;
  }
  logger.infoLog.info('Connecting to MongoDB client...');

  const { url, name } = config.get('db');
  dbClient = mongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      logger.infoLog.info('MongoDB client has been successfully created from mongodbclient.js');
      return client.db(name);
    })
    .catch(err => {
      logger.errorLog.error(`Error occurred while connecting to MongoDB: ${err.message}`);
      process.exit(1); // Optionally exit the app if DB connection fails
    });
  return dbClient;
};
