const UserCtrl = require('../controllers').UsersCtrl;
const passport = require("passport");

module.exports = (app) => {
	app.post('/api/users/create', UserCtrl.create);
	app.post('/api/users/login', UserCtrl.login);
	app.get('/api/users/list', passport.authenticate('jwt', {session: false}), UserCtrl.usersList);
}