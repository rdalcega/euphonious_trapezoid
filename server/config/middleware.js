var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function(app, express) {
  //Serve up static files in client folder and other middleware
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + 'static'));

  //set up express router instances
  var playerRouter = express.Router();

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });


  app.use(function(req, res, next) {
    console.log('=========='); //to sep dev logs in terminal
    next();
  });


  //route request to specific router and inject into specific route file

  app.use('/spheroAPI/player', playerRouter);
  require('../player/playerRoutes')(playerRouter);



};
