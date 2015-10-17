var authController = require('./authCntrl');

//links controller methods to respective routes
module.exports = function(router) {

  router.post('/login', authController.login);

};
