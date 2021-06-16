sequelize model:generate --name regions --attributes name:string
sequelize model:generate --name users --attributes username:string,email:string,password:string,points:integer,regionID:integer
sequelize model:generate --name singlePlayerGames --attributes title:string
sequelize model:generate --name multiPlayerGames --attributes title:string
sequelize model:generate --name singleGameLog --attributes singlePlayerGameID:integer,user1ID:integer
sequelize model:generate --name multiGameLog --attributes multiPlayerGameID:integer,user1ID:integer,user2ID:integer

#  models.multiGameLog.hasMany(models.users, {foreignKey:'userID'});
#  models.singlegamelog.belongsTo(models.users, {foreignKey: 'userID'});
#  models.regions.hasMany(models.users, {foreignKey:'regionID'})



