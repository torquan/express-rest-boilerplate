// eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const sequelize = require('./config/sequelize');

sequelize
  // open sequelize connection
  .connect()
  .then(() => {
    // listen to requests
    app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
  });

/**
 * Exports express
 * @public
 */
module.exports = app;
