'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.users.hasMany(models.multiGameLog, {foreignKey:'userID'});
      // models.users.belongsTo(models.singlegamelog, {foreignKey:'user1ID'});
      // models.users.belongsTo(models.multigamelog, {foreignKey:'user1ID'});
      // models.users.belongsTo(models.multigamelog, {foreignKey:'user2ID'});
      models.users.belongsTo(models.regions, {foreignKey: 'regionID'});
    }
  };
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    points: DataTypes.INTEGER,
    regionID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};