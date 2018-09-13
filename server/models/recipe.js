const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const recipeSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: {type: String, required: false },
  //prepTime: {},
  //cookTime: {},
  servings: { type: Number, required: true },
  ingredients: {type: [String], required: true},
  directions: { type: String, required: true },
  //slug: { type: String, required: true },
  //cuid: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now, required: true },
  img: { data: Buffer, contentType: String },
  upvotes: { type: Number, default: 0 }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;