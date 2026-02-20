const dotenv = require('dotenv');
const colors = require('colors');
const { sequelize } = require('../config/db');
const User = require('../models/User');
const Profile = require('../models/Profile');

// Load env vars
dotenv.config({ path: './.env' });

const createAdmin = async () => {
    try {
        console.log('Connecting to SQL Server for seeding...'.yellow);

        // Sync database (drops existing tables and recreates them)
        await sequelize.sync({ force: true });
        console.log('Database synced (all tables dropped and recreated)'.cyan);

        const admin = await User.create({
            username: 'admin',
            password: 'password123',
            role: 'admin'
        });

        const profile = await Profile.create({
            name: 'Admin User',
            bio: 'Full Stack Developer',
            title: 'Software Engineer',
            skills: ['JavaScript', 'Node.js', 'React'],
            socials: { github: 'github.com', linkedin: 'linkedin.com' }
        });

        console.log('Admin User Created...'.green.inverse);
        console.log('Admin Profile Created...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

const deleteData = async () => {
    try {
        await User.destroy({ where: {}, truncate: true });
        await Profile.destroy({ where: {}, truncate: true });
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    // importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    createAdmin();
}
