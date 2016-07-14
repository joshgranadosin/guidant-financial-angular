'use strict';
module.exports = function(sequelize, DataTypes) {
  var security = sequelize.define('security', {
    type: DataTypes.STRING,
    symbol: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    shares: DataTypes.INTEGER,
    value: DataTypes.STRING,
    portfolioID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return security;
};