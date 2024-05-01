const express = require('express');
const router = express.Router();

const IngredientsService = require('../services/ingredient.services');
const service = new IngredientsService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createIngredientSchema,
  updateIngredientSchema,
  getIngredientSchema,
} = require('../schemas/ingredient.schema');

router.get('/', async (req, res, next) => {
  try {
    const ingredients = await service.find();
    res.status(200).json(ingredients);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  validatorHandler(getIngredientSchema, 'params'),
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
  validatorHandler(createIngredientSchema, 'body'),
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
  validatorHandler(getIngredientSchema, 'params'),
  validatorHandler(updateIngredientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const ingredient = await service.update(id, body);
      res.status(200).json(ingredient);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getIngredientSchema, 'params'),
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
