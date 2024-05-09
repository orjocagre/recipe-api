const Joi = require('joi');

const id = Joi.number().integer();
const recipeId = Joi.number().integer();
const ingredientId = Joi.number().integer();
const amount = Joi.number().min(0);

const createRecipeIngredientSchema = Joi.object({
  recipeId: recipeId.required(),
  ingredientId: ingredientId.required(),
  amount: amount.required(),
});

const getRecipeIngredientSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRecipeIngredientSchema, getRecipeIngredientSchema };
