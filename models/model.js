const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const recipeSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	title: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	ingredients: [String],
	instructions: String,
	upvotes: { type: Number, default: 0 }
});

const userSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	fname: String,
	lname: String,
	email: { type: String, unique: true },
	username: { type: String, unique: true },
	password: String,
	recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);
const User = mongoose.model('User', userSchema)

module.exports = {
	Recipe,
	User
}