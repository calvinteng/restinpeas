const Router = require('express');
const RecipeController = require('../controllers/recipe.controller');
const router = new Router.Router();

// Get all Recipes
router.route('/getAllRecipes').get(RecipeController.getAllRecipes);

// Get one post by cuid
// router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/insert').post(RecipeController.addRecipe);

// Delete a post by cuid
router.route('/delete/:id').get(RecipeController.deleteRecipe);

module.exports = router;