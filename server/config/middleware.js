var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function(app, express) {
//Serve up static files in client folder and other middleware
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  //app.use(express.static(__dirname + 'client'));

//set up express router instances
  var userRouter = express.Router();


  app.use(function(req, res, next){
    console.log('=========='); //to sep dev logs in terminal
    next();
  });


//route request to specific router and inject into specific route file

  app.use('/api/users', userRouter);
  require('../routes/userRoutes')(userRouter);
};