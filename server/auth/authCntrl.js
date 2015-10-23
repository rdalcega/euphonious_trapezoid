var bcrypt = require('bcrypt-nodejs');
var db = require('../db/db.js');
var jwt = require('jsonwebtoken');

module.exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password; // add decrypt
  //check to see if login credentials are in database (no encrypt yet)
  var sqlQueryAsk = "SELECT Players.Player_Username, Players.Email, \
    Players.Player_ID, Players.Hash FROM Players WHERE \
    Player_Username = '" + username + "' LIMIT 1";

  db.query(sqlQueryAsk, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      var player = results[0];
      if (results.length === 0) {
        res.status(401).send('Invalid Username');
      } else {
        bcrypt.compare(password, player.Hash, function(err, response) {
          if (err){
            console.log(err);
          } else {
            if(!response){
              res.status(401).send('Invalid Password');
            } else {
              var profile = { //this is done in callback from db
                userName: player.Player_Username,
                email: player.Email,
                id: player.Player_ID
              };

              var token = jwt.sign(profile, 'flashing kittens love 25% cotton!');

              res.json({
                profile: profile,
                token: token
              });
            }
          }
        });
      }
    }
  });
};
