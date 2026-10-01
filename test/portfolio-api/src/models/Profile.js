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
        defaultValue: ''
    },
    headline: {
        type: DataTypes.STRING,
        field: 'title'
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
    },
    about: DataTypes.TEXT,
    avatar: {
        type: DataTypes.STRING,
        field: 'image'
    },
    email: DataTypes.STRING,
    skills: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    socials: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    experience: {
        type: DataTypes.JSON,
        defaultValue: []
    }
});

module.exports = Profile;
