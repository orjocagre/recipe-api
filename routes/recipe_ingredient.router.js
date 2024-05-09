const express = require('express');
const router = express.Router();

const RecipeIngredientsService = require('../services/recipe_ingredient.services');
const service = new RecipeIngredientsService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createRecipeIngredientSchema,
  getRecipeIngredientSchema,
} = require('../schemas/recipe_ingredient.schema');

router.get('/', async (req, res, next) => {
  try {
    const recipeIngredients = await service.find();
    res.status(200).json(recipeIngredients);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  validatorHandler(getRecipeIngredientSchema, 'params'),
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
  validatorHandler(createRecipeIngredientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (err) {
      next(err);
    }
  },
);

// router.patch(
//   '/:id',
//   validatorHandler(getRecipeIngredientSchema, 'params'),
//   validatorHandler(updateRecipeIngredientSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const { id } = req.params;
//       const recipeIngredient = await service.update(id, body);
//       res.status(200).json(recipeIngredient);
//     } catch (err) {
//       next(err);
//     }
//   },
// );

router.delete(
  '/:id',
  validatorHandler(getRecipeIngredientSchema, 'params'),
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
