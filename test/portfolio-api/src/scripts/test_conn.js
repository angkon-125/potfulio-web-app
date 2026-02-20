const { Connection } = require('tedious');
const sqlConfig = require('../config/sql_connection.json');

const config = {
    server: sqlConfig.server,
    authentication: sqlConfig.authentication,
    options: {
        ...sqlConfig.options,
        port: sqlConfig.port,
        connectTimeout: 10000
    }
};

console.log('Testing connection with config:', JSON.stringify({ ...config, authentication: { ...config.authentication, options: { ...config.authentication.options, password: '***' } } }, null, 2));

const connection = new Connection(config);

connection.on('connect', (err) => {
    if (err) {
        console.error('Connection Failed:', err);
        process.exit(1);
    } else {
        console.log('Connected Successfully!');
        process.exit(0);
    }
});

connection.connect();
