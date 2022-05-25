const Sequelize = require('sequelize')
const db = require('../database/db')
const { STRING } = require('sequelize')

const Gig = db.define('gig', {
    title: {
        type: STRING,
        allowNull: false
    },
    technologies: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false
    },
    budget: {
        type: STRING,
        allowNull: false
    },
},{
    timestamps: false
})

module.exports = Gig