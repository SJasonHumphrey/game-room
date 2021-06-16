'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class singlePlayerGames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.singlePlayerGames.hasMany(models.singleGameLog, {foreignKey:'singlePlayerGameID'});
    }
  };
  singlePlayerGames.init({
    title: DataTypes.STRING,
    user1ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'singlePlayerGames',
  });
  return singlePlayerGames;
};