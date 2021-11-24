const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mariadb',
  dialectOptions: {
    // Your mariadb options here
    // connectTimeout: 1000
  },
});

exports.connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    // Exit application on error
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
  }

  return sequelize;
};
