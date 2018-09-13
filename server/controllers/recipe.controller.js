const Recipe = require('../models/recipe');
// const cuid = require('cuid');
// const slug = require('limax');
// const sanitizeHtml = require('sanitize-html');

function getAllRecipes(req, res) {
  Recipe.find().exec((err, recipes) => {
    if(err) {
      res.status(500).send(err);
    }
    return res.json({ recipes });
  })
}

function addRecipe(req, res) {
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
    res.send('Recipe successfully added.');
  });
};

function deleteRecipe(req, res) {
  //const id = req.query.id;
  Recipe.findOne({_id: req.params.id}).exec((err, recipe) => {
    if(err) {
      res.send(err);
    }

    recipe.remove(() => {
      res.status(200).end();
    });
  });
};

module.exports = {
  getAllRecipes,
  addRecipe,
  deleteRecipe
};