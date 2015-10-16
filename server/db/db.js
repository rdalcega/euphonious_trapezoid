var mysql = require('mysql');

var pool = mysql.createPool({
  user: 'root',
  password: '',
  database: 'Sphero',
  host: 'localhost'
});

// export the db connection
module.exports = pool;
