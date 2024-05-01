const express = require('express');
const usersRouter = require('./user.router');
const ingredientsRouter = require('./ingredient.router');
const recipesRouter = require('./recipe.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/ingredients', ingredientsRouter);
  router.use('/recipes', recipesRouter);
}

module.exports = routerApi;
