// Run this to get the database seeded with data from seed.json

var sequelize_fixtures = require('sequelize-fixtures');
var models = require("./models");

sequelize_fixtures.loadFile('seed.json', models)