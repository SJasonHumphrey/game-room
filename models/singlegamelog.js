'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class singleGameLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.singleGameLog.belongsTo(models.users, {foreignKey: 'user1ID'});
      models.singleGameLog.belongsTo(models.singlePlayerGames, {foreignKey: 'singlePlayerGameID'});
    }
  };
  singleGameLog.init({
    singlePlayerGameID: DataTypes.INTEGER,
    user1ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'singleGameLog',
  });
  return singleGameLog;
};