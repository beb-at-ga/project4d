'use strict';
module.exports = (sequelize, DataTypes) => {
  const testTable = sequelize.define('testTable', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  testTable.associate = function(models) {
    // associations can be defined here
  };
  return testTable;
};