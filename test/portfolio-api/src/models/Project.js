const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a title' },
            len: [1, 100]
        }
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a description' },
            len: [1, 1000]
        }
    },
    techStack: {
        type: DataTypes.JSON, // SQLite stores as TEXT
        defaultValue: []
    },
    liveLink: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    githubLink: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: 'no-photo.jpg'
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Project;
