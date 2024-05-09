const express = require('express');
const usersRouter = require('./user.router');
const ingredientsRouter = require('./ingredient.router');
const recipesRouter = require('./recipe.router');
const recipeIngredientsRouter = require('./recipe_ingredient.router');
const regularIngredientsRouter = require('./regular_ingredient.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/ingredients', ingredientsRouter);
  router.use('/recipes', recipesRouter);
  router.use('/recipe_ingredients', recipeIngredientsRouter);
  router.use('/regular_ingredients', regularIngredientsRouter);
}

module.exports = routerApi;
