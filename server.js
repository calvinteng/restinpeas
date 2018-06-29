//import compression from 'compression';
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Models = require('./models/model.js');
const Recipes = Models.Recipe;
const Users = Models.User;
const app = express();
const url = process.env.MONGOLAB_URI;
//const url = 'mongodb://localhost:27017/restinpeas';

mongoose.connect(url, function (err, db) {
	if(err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		console.log('Connection established to', url);
	}
});

app.get('/', function(req, res) {
	res.json('ayy lmao');
});

app.get('/api/recipes', function(req, res) {
	Recipes.find({}).then(eachOne => {
		res.json(eachOne);
	})
})

app.post('/api/recipes', function(req, res) {
	Recipes.create({
		title: req.body.RecipeTitle,
		author: req.body.RecipeAuthor,
		ingredients: req.body.RecipeIngredients,
		instructions: req.body.RecipeInstructions,
	}).then(recipe => {
		res.json(recipe)
	});
});

const port = 5000;

app.listen(process.env.PORT || port, () => console.log(`Server started on port ${port}`));