const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const passport = require('passport');
require('../config/passport')(passport);
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

getToken = function(headers) {
	if(headers && headers.authorization) {
		const parted = headers.authorization.split('.');
		if(parted.length === 3) {
			return headers.authorization;
		} else {
			return null;
		}
	} else {
		return null;
	}
};

router.route('/upload-img')
.post( upload.single('img'), function(req, res, next) {
	console.log("file: "+req.file+req.files);
	res.send("uploaded");
	recipe.img.data = fs.readFileSync(req.img);
	recipe.img.contentType = 'image/png';
})

router.route('/insert-recipe')
.post(function(req, res) {
	const token = getToken(req.headers);
	if(token){
		let recipe = new Recipe();
			recipe.author = req.body.author;
			recipe.title = req.body.title;
			recipe.ingredients = req.body.ingredients;
			recipe.directions = req.body.directions;
			recipe.servings = req.body.servings;
			recipe.description = req.body.description;

		recipe.save(function(err) {
			if(err) {
				res.send(err);
			}
		});

		User.update(
		{ tagname: req.params.author },
		{ $push: { recipes: recipe } },
		function(err) {
			if(err){
				res.send(err);
			}
			res.send('Recipe added and user successfully updated.');
		});

	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized'});
	}
});

router.route('/getAllRecipes')
.get(function(req, res) {
	Recipe.find().exec((err, recipes) => {
		if(err) {
			res.status(500).send(err);
		}
		return res.json({ recipes });
	})
});

router.route('/update-recipe/:id')
.put(function(req, res) {
	const recipe = {
		author: req.body.author,
		title: req.body.title,
		ingredients: req.body.ingredients,
		directions: req.body.directions,
		servings: req.body.servings,
		description: req.body.description
	};
	Recipe.update({_id: req.body._id}, recipe, function(err, result) {
		if(err){
			res.send(err);
		}
		res.send('Recipe successfully updated.');
	})
});

router.route('/delete-recipe/:recipe_id/:user_id')
.delete(function(req, res) {
	Recipe.find({_id: req.params.recipe_id}).remove().exec(function(err, recipe) {
		if(err){
			res.send(err)
		}
	})

	User.update(
		{_id: req.params.user_id},
		{ $pull: {recipes: req.params.recipe_id}}, function(err, result) {
			if(err){
				res.send(err);
			}
			res.send('Recipe successfully deleted and removed from user.');
		})
});

module.exports = router;