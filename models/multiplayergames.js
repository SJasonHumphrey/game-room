'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class multiPlayerGames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.multiPlayerGames.hasMany(models.multiGameLog, {foreignKey:'multiPlayerGameID'});
    }
  };
  multiPlayerGames.init({
    title: DataTypes.STRING,
    user1ID: DataTypes.INTEGER,
    user2ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'multiPlayerGames',
  });
  return multiPlayerGames;
};