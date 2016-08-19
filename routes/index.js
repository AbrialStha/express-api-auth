var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ToDo: route to authenticate a user
router.post('/auth', function(req,res){
	//find the user
	User.findOne({
		name: req.body.name
	}, function(err, user){
		if(err) throw err;

		if(!user){
			res.json({ sucess: false, message: 'Authentication failed. User not found'});
		}else if(user) {
			//check if the password match
			if(user.password != req.body.password) {
				res.json({ sucess: false, message: 'Authentication failed. password not match'});
			}else {
				//if user is found and password is correct
				//create a token
				var token = config.secret;
				console.log('token', token);

				// return the information including token as Json
				res.json({
					sucess: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});
module.exports = router;
