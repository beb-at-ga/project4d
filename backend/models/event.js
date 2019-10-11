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

  event.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
  }

  return event;
};