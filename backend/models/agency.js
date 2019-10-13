'use strict';
module.exports = (sequelize, DataTypes) => {
  const agency = sequelize.define('agency', {
    name: DataTypes.STRING
  }, {});
  agency.associate = function(models) {
    // associations can be defined here
  };
  return agency;
};