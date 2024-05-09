const express = require('express');
const router = express.Router();

const RegularIngredientsService = require('../services/regular_ingredient.services');
const service = new RegularIngredientsService();

const validatorHandler = require('../middlewares/validator.handler');
const {
  createRegularIngredientSchema,
  getRegularIngredientSchema,
} = require('../schemas/regular_ingredient.schema');

router.get('/', async (req, res, next) => {
  try {
    const regularIngredients = await service.find();
    res.status(200).json(regularIngredients);
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  validatorHandler(getRegularIngredientSchema, 'params'),
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
  validatorHandler(createRegularIngredientSchema, 'body'),
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
//   validatorHandler(getRegularIngredientSchema, 'params'),
//   validatorHandler(updateRegularIngredientSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const { id } = req.params;
//       const regularIngredient = await service.update(id, body);
//       res.status(200).json(regularIngredient);
//     } catch (err) {
//       next(err);
//     }
//   },
// );

router.delete(
  '/:id',
  validatorHandler(getRegularIngredientSchema, 'params'),
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
