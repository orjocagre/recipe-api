const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const ingredientId = Joi.number().integer();

const createRegularIngredientSchema = Joi.object({
  userId: userId.required(),
  ingredientId: ingredientId.required(),
});

const getRecipeIngredientSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRegularIngredientSchema, getRecipeIngredientSchema };
