const mysql = require('mysql2');


// Create connection to our mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mysql_first_day_db'
});

module.exports = db.promise();