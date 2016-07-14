'use strict';
module.exports = function(sequelize, DataTypes) {
  var portfolio = sequelize.define('portfolio', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return portfolio;
};