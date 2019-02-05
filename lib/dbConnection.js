const mongoose = require('mongoose');
const chalk = require('chalk');

const { devConfig } = require('../config/dbDevConfig');

const connectionString = process.env.MONGODB_CONNECTION_STRING || `mongodb://${
  devConfig.database.user}:${
  devConfig.database.password}@${
  devConfig.database.host}:${
  devConfig.database.port}/${
  devConfig.database.name}`;

const initializeConnection = () => {
  mongoose.Promise = Promise;
  mongoose.connect(connectionString, { useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);

  const db = mongoose.connection;
  db.on('error', error => {
    console.error(`There was an error connecting to the database ${error}`);
  });
  db.once('open', () => {
    // eslint-disable-next-line
    console.log(chalk.blue('Successfully connected to database.'));
  });
};

module.exports = {
  initializeConnection,
};
