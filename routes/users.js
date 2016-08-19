var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var config = require('../config');


//ToDO:route middleware to verify a token
router.use(function(req,res,next) {
	//check header or url param
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	//decode token
	if(token) {
		if(token != config.secret){
			return res.json({
				sucess: false,
				message: 'invalid token'
			});
		}else {
			console.log('decoded');
			next();
		}
	} else {
		//if no token
		return res.status(403).send({
			sucess: false,
			message: 'Give me token'
		});
	}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//route to return all users
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

/*setting up the user*/
router.get('/setup', function(req,res) {
	//create a sample user
	var abi = new User({
		name: 'Abiral Sthapit',
		password: 'password',
		admin: true
	});

	//save the sample user
	abi.save(function(err){
		if(err){
			console.log('err',err);
		}
		console.log('user saved sucessfully');
		res.json({ sucess: true });
	});
});

//apply the routes to our application with the prefix /api
router.use('/api', router);

module.exports = router;
