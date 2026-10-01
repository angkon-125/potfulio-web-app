const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
});

async function check() {
    try {
        const [results] = await sequelize.query("SELECT id, name, image, skills FROM Profiles LIMIT 1;");
        console.log('--- Current Profile in DB ---');
        console.log(JSON.stringify(results[0], null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
