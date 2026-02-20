const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a name' }
        }
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a bio' }
        }
    },
    title: DataTypes.STRING,
    skills: {
        type: DataTypes.JSON, // Stores array of strings
        defaultValue: []
    },
    socials: {
        type: DataTypes.JSON, // Stores object { github, linkedin, ... }
        defaultValue: {}
    },
    experience: {
        type: DataTypes.JSON, // Stores array of objects
        defaultValue: []
    },
    image: DataTypes.STRING
});

module.exports = Profile;
