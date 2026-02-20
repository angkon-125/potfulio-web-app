const { Sequelize } = require('sequelize');
const sqlConfig = require('./sql_connection.json');

const sequelize = new Sequelize(
    sqlConfig.options.database,
    sqlConfig.authentication.options.userName,
    sqlConfig.authentication.options.password,
    {
        host: sqlConfig.server,
        port: sqlConfig.port,
        dialect: 'mssql',
        logging: false,
        dialectOptions: {
            options: {
                instanceName: 'MSSQLSERVER',
                encrypt: sqlConfig.options.encrypt,
                trustServerCertificate: sqlConfig.options.trustServerCertificate
            }
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('SQL Server Connected');
        // Sync models
        await sequelize.sync();
        console.log('Models Synced');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };

