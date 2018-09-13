const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const recipes = require('./routes/recipes');
const auth = require('./routes/auth');
const app = express();
const url = process.env.MONGOLAB_URI;
const pathModule = require('path');

//const url = 'mongodb://localhost:27017/restinpeas';

mongoose.Promise = global.Promise;

mongoose.connect(url, function (err, db) {
	if(err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		console.log('Connection established to', url);
	}
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../dist/client')));
app.use('/api', recipes);
app.use('/api', auth);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));