var bcrypt = require('bcrypt-nodejs');
var db = require('../db/db.js');

module.exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password; // will encrypt
  var params = [username, password, req.body.email];

  var sqlQueryAsk = "SELECT Players.Player_Username FROM \
    Players WHERE Player_Username = '" + username + "' \
    LIMIT 1";
  var sqlQueryIns = "INSERT INTO Players (Player_Username, Hash, Email) \
    Value (?, ?, ?)";

  db.query(sqlQueryAsk, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      if (results.length !== 0) { // if entry exists then kick back and ask for new input
        res.status(403).send('username already taken');
      } else { // if entry does not exist then submit into to database kick to login on the client
        bcrypt.hash(password, null, null, function(err, hash) {
          if(err){
            console.log(err);
          } else {
            console.log(hash)
            params[1] = hash;
            db.query(sqlQueryIns, params, function(err) {
              if (err) {
                console.log(err);
              } else {
                res.status(200).send('credentials accepted, redirect to login');
              }
            });
          }
        });
      }
    }
  });
};
