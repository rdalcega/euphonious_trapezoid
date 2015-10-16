var playerController = require('./playerCtrnl');

//links controller methods to respective routes
module.exports = function(router){

  router.post('/signup', playerController.signup);
  router.get('/signin', playerController.signin);
};