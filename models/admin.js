'use strict';
module.exports = function(sequelize, DataTypes) {
  var admin = sequelize.define('admin', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return admin;
};