const Sequelize = require("sequelize");
const config = require("./config.json").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
      connectTimeout: 60000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    retry: {
      max: 10, // Número máximo de tentativas de reconexão
    },
  }
);

const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    setTimeout(connectWithRetry, 5000); // Tenta reconectar após 5 segundos
  }
};

connectWithRetry();

module.exports = sequelize;
