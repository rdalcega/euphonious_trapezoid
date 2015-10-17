var db = require('../db/db.js');
var jwt = require('jsonwebtoken');

module.exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password; // add decrypt
  //check to see if login credentials are in database (no encrypt yet)
  var sqlQueryAsk = "SELECT Players.Player_Username, Players.Email, \
    Players.Player_ID FROM Players WHERE \
    Player_Username = '" + username + "' AND \
    Password = '" + password + "' LIMIT 1";

  db.query(sqlQueryAsk, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      if (results.length === 0) {
        res.status(401).send('Invalid login credentials');
      } else {
        var profile = { //this is done in callback from db
          userName: results[0].Player_Username,
          email: results[0].Email,
          id: results[0].Player_ID
        };

        var token = jwt.sign(profile, 'flashing kittens love 25% cotton!', {
          expiresIn: 60 * 60 * 8
        });

        res.json([profile, {
          token: token
        }]);
      }
    }
  });

};
