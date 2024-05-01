const express = require('express');
const router = express.Router();

const RecipesService = require('../services/recipe.services');
const service = new RecipesService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createRecipeSchema,
  updateRecipeSchema,
  getRecipeSchema,
} = require('../schemas/recipe.schema');

router.get('/', async (req, res, next) => {
  try {
    const recipes = await service.find();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  validatorHandler(getRecipeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.findOne(id));
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/',
  validatorHandler(createRecipeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getRecipeSchema, 'params'),
  validatorHandler(updateRecipeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const recipe = await service.update(id, body);
      res.status(200).json(recipe);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getRecipeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
