const { Sequelize, DataTypes } = require('sequelize');
const sqlConfig = require('./sql_connection.json');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the correct path
dotenv.config({ path: path.join(__dirname, '../../.env') });

const dialect = process.env.DB_DIALECT || 'mssql';

let sequelize;

if (dialect === 'mssql') {
    sequelize = new Sequelize(
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
                    trustServerCertificate: sqlConfig.options.trustServerCertificate,
                    connectTimeout: 5000
                }
            }
        }
    );
} else {
    console.log('Using SQLite Database...');
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '../../database.sqlite'),
        logging: false
    });
}

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`${dialect === 'mssql' ? 'SQL Server' : 'SQLite'} Connected Successfully`);
        await sequelize.sync();
        await ensureColumns();
        console.log('Models Synced');
    } catch (err) {
        console.error(`Database Connection Failed: ${err.message}`);
        if (dialect === 'mssql') {
            console.log('TIP: Try setting DB_DIALECT=sqlite in your .env file.');
        }
        process.exit(1);
    }
};

const ensureColumns = async () => {
    const queryInterface = sequelize.getQueryInterface();
    const addIfMissing = async (table, column, definition) => {
        const columns = await queryInterface.describeTable(table);
        if (!columns[column]) {
            await queryInterface.addColumn(table, column, definition);
        }
    };

    await addIfMissing('Profiles', 'about', { type: DataTypes.TEXT });
    await addIfMissing('Profiles', 'email', { type: DataTypes.STRING });
    await addIfMissing('Messages', 'subject', { type: DataTypes.STRING, allowNull: false, defaultValue: '' });
};

module.exports = { sequelize, connectDB };

