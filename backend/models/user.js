const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ajuste o caminho conforme necessário

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.BLOB("long"), // Alterado para LONGBLOB
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
