var mysql = require('mysql');

var pool = mysql.createPool({
  user: 'root',
  password: '',
  database: 'heroku_a35b008f64f7309',
  host: 'localhost'
});

// export the db connection
module.exports = pool;