'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    data: DataTypes.STRING
  }, {});
  event.associate = function(models) {
    // associations can be defined here
    models.event.belongsTo(models.user);
  };
  return event;
};