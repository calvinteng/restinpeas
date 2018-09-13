const passport = require('passport');
const mongoose = require('mongoose');
const settings = require('../config/settings');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");

router.route('/get-user/:username')
.get(function(req, res) {
	const username = req.params.username;
	User.find({username: username}).exec((err, user) => {
		if(err) {
			res.status(500).send(err);
		}
		return res.json({user});
	})
})

router.route('/get-userinfo/:tagname')
.get(function(req, res) {
	const tagname = req.params.tagname;

	User.find({tagname: tagname}).populate('recipes').exec((err, user) => {
		if(err) {
			res.status(500).send(err);
		}
		return res.json({user});
	})
})

router.route('/register')
.post(function(req, res) {
	let newUser = new User();
		newUser.fname = req.body.fname;
		newUser.lname = req.body.lname;
		newUser.tagname = req.body.tagname;
		newUser.email = req.body.email;
		newUser.username = req.body.username;
		newUser.password = req.body.password;
	newUser.save(function(err) {
		if(err) {
			res.send(err);
		}
		res.send('Successfully created new user.');
	});
});

router.route('/login')
.post(function(req, res) {
	User.findOne({
		username: req.body.username
	}, function(err, user) {
		if(err) throw err;

		if(!user) {
			res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
		} else {
			user.comparePassword(req.body.password, function(err, isMatch) {
				if(isMatch && !err) {
					const token = jwt.sign(user.toJSON(), settings.secret);
					res.json({user: user, token});
				} else {
					res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
				}
			});
		}
	});
});

module.exports = router;