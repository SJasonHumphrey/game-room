'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class multiGameLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.multiGameLog.belongsTo(models.users, {foreignKey:'user1ID'});
      models.multiGameLog.belongsTo(models.users, {foreignKey:'user2ID'});
      models.multiGameLog.belongsTo(models.multiPlayerGames, {foreignKey: 'multiPlayerGameID'});
    }
  };
  multiGameLog.init({
    multiPlayerGameID: DataTypes.INTEGER,
    user1ID: DataTypes.INTEGER,
    user2ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'multiGameLog',
  });
  return multiGameLog;
};