const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const recipeSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	title: { type: String, required: true},
	author: { type: Schema.Types.ObjectId, ref: 'Users' },
	ingredients: { type: [String], required: true },
	instructions: { type: String, required: true },
	upvotes: { type: Number, default: 0 }
});

const userSchema = new Schema ({
	_id: Schema.Types.ObjectId,
	fname: { type: [String], required: true },
	lname: { type: [String], required: true },
	email: { type: String, unique: true, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: [String], required: true },
	recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipes' }]
});

const Recipes = mongoose.model('Recipes', recipeSchema);
const Users = mongoose.model('Users', userSchema)

module.exports = {
	Recipes,
	Users
}