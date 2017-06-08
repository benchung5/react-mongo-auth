const User = require('../models/user');

exports.getUsers = function(req, res, next) {
	//find all - just pass in empty object
	//retun just the email fields (must use -_id to explictly exclude the id filed)
	var query = User.find({}).select('email -_id');

	query.exec(function (err, foundUsers) {
		console.log(foundUsers);
	    if (err) return next(err);
	    res.send(foundUsers);
	});
}

exports.deleteUser = function(req, res, next) {
	console.log(req.body);
	User.findOneAndRemove(req.body, (err, deletedUser) => {
		console.log(deletedUser);
		if (err) return next(err);
		res.json(deletedUser);
	});
}