var playerController = require('./playerCntrl');

//links controller methods to respective routes
module.exports = function(router) {

  router.post('/signup', playerController.signup);

};
