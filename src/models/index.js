const dbConfig = require('../config/dbConfig')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    operatorAliases: false,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./user.model.js')(sequelize, Sequelize)

module.exports = db;